import { useEffect, useRef } from "react";

const CELL_W = 14; // px per character column
const CELL_H = 18; // px per character row
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

// Elements the stars steer around.
const CONTENT =
  "main h1, main h2, main h3, main p, main li, main img, main .status, .footer, .pill-nav";

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
    // Per-cell openness: 1 in empty space, 0 behind content. Stars gather
    // where it's high. Rebuilt when the layout under the canvas moves.
    let space = new Float32Array(0);
    let spaceDirty = true;
    let spaceAt = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, on: false };

    const computeSpace = () => {
      const n = cols * rows;
      const solid = new Float32Array(n).fill(1);
      document.querySelectorAll(CONTENT).forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight || !r.width) return;
        // One cell of padding keeps stars off the edges of text.
        const x0 = Math.max(0, Math.floor(r.left / CELL_W) - 1);
        const x1 = Math.min(cols - 1, Math.floor(r.right / CELL_W) + 1);
        const y0 = Math.max(0, Math.floor(r.top / CELL_H) - 1);
        const y1 = Math.min(rows - 1, Math.floor(r.bottom / CELL_H) + 1);
        for (let y = y0; y <= y1; y++) solid.fill(0, y * cols + x0, y * cols + x1 + 1);
      });
      // Two box-blur passes soften the edges so the field fades toward
      // content instead of stopping at a hard line.
      let src = solid;
      for (let pass = 0; pass < 2; pass++) {
        const out = new Float32Array(n);
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            let sum = 0;
            let count = 0;
            for (let dy = -2; dy <= 2; dy++) {
              const yy = y + dy;
              if (yy < 0 || yy >= rows) continue;
              for (let dx = -2; dx <= 2; dx++) {
                const xx = x + dx;
                if (xx < 0 || xx >= cols) continue;
                sum += src[yy * cols + xx];
                count++;
              }
            }
            out[y * cols + x] = sum / count;
          }
        }
        src = out;
      }
      space = src;
      spaceDirty = false;
    };
    const markDirty = () => {
      spaceDirty = true;
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
      spaceDirty = true;
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
      // Rebuild the space map after scrolls and resizes, and every half
      // second anyway to catch sections fading in.
      if (spaceDirty || t - spaceAt > 500) {
        computeSpace();
        spaceAt = t;
      }

      const s = t / 1400;
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
          // Each cell also twinkles strongly on its own phase.
          const twinkle = 0.5 + 0.5 * Math.sin(t / 320 + phase[i]);
          // Waves swell and dim the field rather than gating it, so open
          // space always holds stars; the space map piles them into
          // whitespace and thins them behind content.
          const wave = (v + 4) / 8;
          let b =
            (0.3 + 0.7 * wave) *
            (0.3 + 0.7 * twinkle) *
            (0.05 + 1.2 * space[i]);

          if (pointer.on) {
            const dx = (x - pointer.x) / glowX;
            const dy = (y - pointer.y) / glowY;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 1) b += (1 - d) ** 2 * 0.9;
          }
          if (b < 0.06) continue;
          b = Math.min(b, 1);

          const glyph = Math.min(RAMP.length - 1, Math.floor(b * RAMP.length));
          const level = Math.min(ALPHA_STEPS, Math.ceil(b * ALPHA_STEPS));
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

    // With reduced motion there's no animation loop, so redraw the static
    // frame (at most once per animation frame) when the page scrolls.
    const onStillScroll = () => {
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          draw(0);
        });
      }
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
    window.addEventListener("scroll", markDirty, { passive: true });
    if (still) {
      draw(0);
      // Redraw once the web font arrives so glyphs use it, and on scroll so
      // the stars stay in the whitespace.
      document.fonts?.ready.then(() => draw(0));
      window.addEventListener("scroll", onStillScroll, { passive: true });
    } else {
      window.addEventListener("pointermove", onMove);
      document.documentElement.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", markDirty);
      window.removeEventListener("scroll", onStillScroll);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="bg-canvas" aria-hidden="true" />;
};

export default Background;
