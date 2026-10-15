import { useEffect, useRef } from "react";

const CELL_W = 12; // px per character column
const CELL_H = 15; // px per character row
const FONT = '12px "JetBrains Mono", ui-monospace, monospace';
const GLOW = 170; // radius of the cursor glow in px

// Brightness ramp, faintest to brightest: dots that grow into four-point stars.
const RAMP = ["·", "·", "∙", "+", "✧", "✧", "✦", "✦"];

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

// Precomputed fill styles, indexed by color * ALPHA_STEPS + (level - 1).
const STYLES = COLORS.flatMap(({ rgb, max }) =>
  Array.from(
    { length: ALPHA_STEPS },
    (_, i) => `rgba(${rgb}, ${(((i + 1) / ALPHA_STEPS) * max).toFixed(3)})`,
  ),
);

// Cheap deterministic per-cell hash in [0, 1).
const hash = (x: number, y: number) => {
  const h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return h - Math.floor(h);
};

// An animated field of characters behind the page: drifting waves of light
// that grow each cell from a dot into a star, plus a glow following the
// cursor. Brightness comes from overlapping sine waves (no noise library).
const Background = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = 0;
    let cols = 0;
    let rows = 0;
    let dpr = 1;
    // Per-cell constants, rebuilt on resize: twinkle phase and color index.
    let phase = new Float32Array(0);
    let color = new Uint8Array(0);
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, on: false };

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
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          phase[i] = hash(x, y) * Math.PI * 2;
          // About 1 in 6 cells carries a muted color.
          if (hash(x + 91, y + 37) < 0.18) {
            color[i] = 1 + Math.floor(hash(x + 7, y + 3) * (COLORS.length - 1));
          }
        }
      }
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

    // Cells are grouped by fill style so each style is set once per frame.
    // Each bucket holds flat [x, y, glyphIndex] triples.
    const buckets: number[][] = STYLES.map(() => []);

    const draw = (t: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.font = FONT;
      ctx.textBaseline = "top";
      buckets.forEach((b) => (b.length = 0));

      const s = t / 2000;
      pointer.x += (pointer.tx - pointer.x) * 0.18;
      pointer.y += (pointer.ty - pointer.y) * 0.18;
      const glowX = GLOW / CELL_W;
      const glowY = GLOW / CELL_H;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const v =
            Math.sin(x * 0.07 + s * 1.3) +
            Math.sin(y * 0.11 - s) +
            Math.sin((x + y) * 0.04 + s * 0.7) +
            Math.sin(Math.hypot(x - cols * 0.7, y - rows * 0.2) * 0.08 - s * 1.6);
          // Each cell also twinkles on its own phase.
          const twinkle = 0.5 + 0.5 * Math.sin(t / 480 + phase[i]);
          // Every cell keeps a faint floor so no part of the page goes
          // blank; waves rise above it (squared, so peaks still stand out).
          const wave = (v + 4) / 8;
          let b = (0.22 + 0.78 * wave * wave) * (0.4 + 0.6 * twinkle);

          if (pointer.on) {
            const dx = (x - pointer.x) / glowX;
            const dy = (y - pointer.y) / glowY;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 1) b += (1 - d) ** 2 * 0.9;
          }
          if (b < 0.06) continue;
          b = Math.min(b, 1);

          const glyph = Math.min(RAMP.length - 1, Math.floor(b * RAMP.length));
          const level = Math.min(ALPHA_STEPS, Math.max(2, Math.ceil(b * ALPHA_STEPS)));
          buckets[color[i] * ALPHA_STEPS + level - 1].push(x, y, glyph);
        }
      }

      buckets.forEach((cells, k) => {
        if (!cells.length) return;
        ctx.fillStyle = STYLES[k];
        for (let j = 0; j < cells.length; j += 3) {
          ctx.fillText(RAMP[cells[j + 2]], cells[j] * CELL_W, cells[j + 1] * CELL_H);
        }
      });
    };

    const loop = (t: number) => {
      // ~20 fps is smooth enough for a slow drift and keeps CPU use low.
      if (t - last > 50) {
        draw(t);
        last = t;
      }
      raf = requestAnimationFrame(loop);
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
