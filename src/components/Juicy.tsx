import { useRef, type PointerEvent, type ReactNode } from "react";

const TILT = 10; // max tilt in degrees

// Wraps a photo with game-feel "juice": it tilts toward the cursor, lifts and
// glows on hover, squishes when pressed, and pops in when first shown. The
// motion itself lives in CSS (.juicy); this only feeds it the cursor position.
const Juicy = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1 across
    const py = (e.clientY - r.top) / r.height; // 0..1 down
    el.style.setProperty("--ry", `${(px - 0.5) * TILT * 2}deg`);
    el.style.setProperty("--rx", `${(0.5 - py) * TILT * 2}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    for (const v of ["--rx", "--ry", "--mx", "--my"]) el.style.removeProperty(v);
  };

  return (
    <span ref={ref} className={`juicy ${className}`} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </span>
  );
};

export default Juicy;
