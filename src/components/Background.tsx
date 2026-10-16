import { useEffect, useRef } from "react";

const CELL_W = 12; // px per character column
const CELL_H = 15; // px per character row
const FONT = '12px "JetBrains Mono", ui-monospace, monospace';
const GLOW = 170; // radius of the cursor glow in px

// Brightness ramp, faintest to brightest: dots that grow into four-point stars.
// Indexes below STAR_FROM are drawn as small squares, the rest as text.
const RAMP = ["·", "·", "∙", "+", "✧", "✧", "✦", "✦"];
const STAR_FROM = 3;
const DOT_SIZE = [1.5, 1.5, 2.5];

// Mostly grey, with "notes" in the button purple (#2a0d3e) scattered through
// the field. That exact shade vanishes on the dark background, so the notes
// use lighter tints of the same hue. They sit brighter than the grey so they
// read as color.
const COLORS = [
  { rgb: "214, 220, 230", max: 0.34 }, // grey
  { rgb: "90, 42, 128", max: 0.9 }, // #5a2a80, the button outline
  { rgb: "118, 52, 172", max: 0.85 }, // #7634ac
  { rgb: "150, 92, 200", max: 0.75 }, // #965cc8
];
const ALPHA_STEPS = 8;
// Every cell sits at least at this level; that layer is drawn once and reused.
const FLOOR_LEVEL = 2;

// Precomputed fill styles, indexed by color * ALPHA_STEPS + (level - 1).
const STYLES = COLORS.flatMap(({ rgb, max }) =>
  Array.from(
    { length: ALPHA_STEPS },
    (_, i) => `rgba(${rgb}, ${(((i + 1) / ALPHA_STEPS) * max).toFixed(3)})`,
  ),
);

// Table-based sine; plenty accurate for a background and much cheaper.
const LUT_SIZE = 1024;
const LUT_SCALE = LUT_SIZE / (Math.PI * 2);
const SIN = Float32Array.from({ length: LUT_SIZE }, (_, i) => Math.sin(i / LUT_SCALE));
const fastSin = (a: number) => SIN[((a * LUT_SCALE) | 0) & (LUT_SIZE - 1)];

// Cheap deterministic per-cell hash in [0, 1).
const hash = (x: number, y: number) => {
  const h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return h - Math.floor(h);
};

// An animated field of characters behind the page: drifting waves of light
// that grow each cell from a dot into a star, plus a glow following the
// cursor. Brightness comes from overlapping sine waves (no noise library).
//
// Performance: the faint floor dot under every cell is drawn once into an
// offscreen canvas and copied in each frame, so only brighter cells are drawn
// per frame. Small dots are batched into one path per style, and only the
// stars go through fillText. Wave terms that depend on just the row or column
// are computed once per row/column, and the cursor glow only touches cells
// near the cursor.
const Background = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = 0;
    // Grows on slow machines or huge screens so the background stays cheap.
    let interval = 50;
    let cols = 0;
    let rows = 0;
    let dpr = 1;
    // Per-cell constants, rebuilt on resize.
    let phase = new Float32Array(0);
    let color = new Uint8Array(0);
    let radial = new Float32Array(0);
    let colWave = new Float32Array(0);
    let rowWave = new Float32Array(0);
    let diagWave = new Float32Array(0);
    const floor = document.createElement("canvas");
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, on: false };

    const buildFloor = () => {
      floor.width = canvas.width;
      floor.height = canvas.height;
      const f = floor.getContext("2d");
      if (!f) return;
      f.setTransform(dpr, 0, 0, dpr, 0, 0);
      const s = DOT_SIZE[1];
      COLORS.forEach((_, c) => {
        f.fillStyle = STYLES[c * ALPHA_STEPS + FLOOR_LEVEL - 1];
        f.beginPath();
        for (let i = 0; i < cols * rows; i++) {
          if (color[i] !== c) continue;
          const x = (i % cols) * CELL_W + CELL_W / 2 - s / 2;
          const y = Math.floor(i / cols) * CELL_H + CELL_H / 2 - s / 2;
          f.rect(x, y, s, s);
        }
        f.fill();
      });
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      cols = Math.ceil(window.innerWidth / CELL_W);
      rows = Math.ceil(window.innerHeight / CELL_H);
      phase = new Float32Array(cols * rows);
      color = new Uint8Array(cols * rows);
      radial = new Float32Array(cols * rows);
      colWave = new Float32Array(cols);
      rowWave = new Float32Array(rows);
      diagWave = new Float32Array(cols + rows);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          phase[i] = hash(x, y) * Math.PI * 2;
          radial[i] = Math.hypot(x - cols * 0.7, y - rows * 0.2) * 0.08;
          // About 1 in 6 cells carries a muted color.
          if (hash(x + 91, y + 37) < 0.18) {
            color[i] = 1 + Math.floor(hash(x + 7, y + 3) * (COLORS.length - 1));
          }
        }
      }
      buildFloor();
    };

    const onMove = (e: PointerEvent) => {
      pointer.tx = e.clientX / CELL_W;
      pointer.ty = e.clientY / CELL_H;
      if (!pointer.on) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
      pointer.on = true;
    };
    const onLeave = () => {
      pointer.on = false;
    };

    // Per style: flat [x, y] pairs for dots and [x, y, glyph] triples for stars.
    const dots: number[][] = STYLES.map(() => []);
    const stars: number[][] = STYLES.map(() => []);
    // Extra brightness from the cursor glow, only filled near the cursor.
    let glow = new Float32Array(0);

    const draw = (t: number) => {
      // The window can briefly report a zero size while the page loads;
      // there's nothing to draw until a resize gives it real dimensions.
      if (!canvas.width || !canvas.height || !floor.width || !floor.height) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(floor, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots.forEach((b) => (b.length = 0));
      stars.forEach((b) => (b.length = 0));

      const s = t / 2000;
      for (let x = 0; x < cols; x++) colWave[x] = fastSin(x * 0.07 + s * 1.3);
      for (let y = 0; y < rows; y++) rowWave[y] = fastSin(y * 0.11 - s);
      for (let k = 0; k < cols + rows; k++) diagWave[k] = fastSin(k * 0.04 + s * 0.7);
      const radialShift = s * 1.6;
      const twinkleShift = t / 480;

      // Cursor glow, limited to the box around the cursor.
      if (glow.length !== cols * rows) glow = new Float32Array(cols * rows);
      else glow.fill(0);
      if (pointer.on) {
        pointer.x += (pointer.tx - pointer.x) * 0.18;
        pointer.y += (pointer.ty - pointer.y) * 0.18;
        const gx = GLOW / CELL_W;
        const gy = GLOW / CELL_H;
        const x0 = Math.max(0, Math.floor(pointer.x - gx));
        const x1 = Math.min(cols - 1, Math.ceil(pointer.x + gx));
        const y0 = Math.max(0, Math.floor(pointer.y - gy));
        const y1 = Math.min(rows - 1, Math.ceil(pointer.y + gy));
        for (let y = y0; y <= y1; y++) {
          for (let x = x0; x <= x1; x++) {
            const dx = (x - pointer.x) / gx;
            const dy = (y - pointer.y) / gy;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 1) glow[y * cols + x] = (1 - d) ** 2 * 0.9;
          }
        }
      }

      for (let y = 0; y < rows; y++) {
        const rw = rowWave[y];
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const v = colWave[x] + rw + diagWave[x + y] + fastSin(radial[i] - radialShift);
          // Each cell also twinkles on its own phase.
          const twinkle = 0.5 + 0.5 * fastSin(twinkleShift + phase[i]);
          // Every cell keeps a faint floor so no part of the page goes
          // blank; waves rise above it (squared, so peaks still stand out).
          const wave = (v + 4) / 8;
          let b = (0.22 + 0.78 * wave * wave) * (0.4 + 0.6 * twinkle) + glow[i];
          b = Math.min(b, 1);

          const glyph = Math.min(RAMP.length - 1, Math.floor(b * RAMP.length));
          const level = Math.min(ALPHA_STEPS, Math.max(FLOOR_LEVEL, Math.ceil(b * ALPHA_STEPS)));
          // Same as the floor layer underneath: nothing more to draw.
          if (glyph < 2 && level === FLOOR_LEVEL) continue;
          const k = color[i] * ALPHA_STEPS + level - 1;
          if (glyph < STAR_FROM) dots[k].push(x, y, glyph);
          else stars[k].push(x, y, glyph);
        }
      }

      ctx.font = FONT;
      ctx.textBaseline = "top";
      for (let k = 0; k < STYLES.length; k++) {
        const d = dots[k];
        const st = stars[k];
        if (!d.length && !st.length) continue;
        ctx.fillStyle = STYLES[k];
        if (d.length) {
          ctx.beginPath();
          for (let j = 0; j < d.length; j += 3) {
            const size = DOT_SIZE[d[j + 2]];
            ctx.rect(
              d[j] * CELL_W + CELL_W / 2 - size / 2,
              d[j + 1] * CELL_H + CELL_H / 2 - size / 2,
              size,
              size,
            );
          }
          ctx.fill();
        }
        for (let j = 0; j < st.length; j += 3) {
          ctx.fillText(RAMP[st[j + 2]], st[j] * CELL_W, st[j + 1] * CELL_H);
        }
      }
    };

    const loop = (t: number) => {
      // Schedule the next frame first, so one bad frame can't stop the animation.
      raf = requestAnimationFrame(loop);
      if (t - last > interval) {
        const start = performance.now();
        draw(t);
        // Keep the background under ~20% of a frame budget: if a frame got
        // expensive, draw less often (between 20 and 5 fps).
        interval = Math.min(200, Math.max(50, (performance.now() - start) * 5));
        last = t;
      }
    };

    resize();
    window.addEventListener("resize", resize);
    if (still) {
      draw(0);
      // Redraw once the web font arrives so glyphs use it.
      document.fonts?.ready.then(() => draw(0));
    } else {
      window.addEventListener("pointermove", onMove);
      document.documentElement.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="bg-canvas" aria-hidden="true" />;
};

export default Background;
