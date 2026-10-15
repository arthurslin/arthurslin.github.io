import { useEffect, useRef } from "react";

const CELL = 6; // px between dots
const DOT = 2; // dot size in px
const GLOW = 160; // radius of the cursor glow in px

// An animated dot-matrix texture drawn behind the page: drifting waves of
// light, plus a soft glow that follows the cursor. Brightness comes from a
// few overlapping sine waves, so it needs no noise library.
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
    // Pointer position in cells, eased toward the real cursor for a trailing feel.
    const pointer = { x: -999, y: -999, tx: -999, ty: -999, strength: 0 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.ceil(canvas.width / CELL);
      rows = Math.ceil(canvas.height / CELL);
    };

    const onMove = (e: PointerEvent) => {
      pointer.tx = e.clientX / CELL;
      pointer.ty = e.clientY / CELL;
      if (pointer.x < -900) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
      pointer.strength = 1;
    };
    const onLeave = () => {
      pointer.strength = 0;
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const s = t / 2600;
      pointer.x += (pointer.tx - pointer.x) * 0.15;
      pointer.y += (pointer.ty - pointer.y) * 0.15;
      const glowCells = GLOW / CELL;
      // A slow diagonal band of light that sweeps across the screen.
      const sweep = ((t / 60) % (cols + rows + 200)) - 100;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const v =
            Math.sin(x * 0.045 + s * 1.3) +
            Math.sin(y * 0.06 - s) +
            Math.sin((x + y) * 0.025 + s * 0.7) +
            Math.sin(Math.hypot(x - cols * 0.7, y - rows * 0.2) * 0.05 - s * 1.6);
          let a = Math.max(0, v / 4) * 0.18;

          const band = Math.abs(x + y - sweep);
          if (band < 24) a += (1 - band / 24) * 0.05;

          if (pointer.strength) {
            const d = Math.hypot(x - pointer.x, y - pointer.y);
            if (d < glowCells) a += (1 - d / glowCells) ** 2 * 0.35;
          }

          if (a < 0.012) continue;
          ctx.fillStyle = `rgba(214, 222, 235, ${Math.min(a, 0.6).toFixed(3)})`;
          ctx.fillRect(x * CELL, y * CELL, DOT, DOT);
        }
      }
    };

    const loop = (t: number) => {
      // ~30 fps keeps the motion smooth while limiting CPU use.
      if (t - last > 33) {
        draw(t);
        last = t;
      }
      raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    if (still) {
      draw(0);
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
