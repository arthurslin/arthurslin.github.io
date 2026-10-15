import { useEffect, useState } from "react";

// The home section can't use id="root": React mounts the app on #root.
const items = [
  { id: "home", label: "home" },
  { id: "work", label: "work" },
  { id: "projects", label: "projects" },
  { id: "contact", label: "contact" },
];

// Floating nav that highlights whichever section is in view.
const PillNav = () => {
  const [active, setActive] = useState("home");
  // Near the top of the page; the CSS uses this to hide the menu on phones.
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const els = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    let raf = 0;

    // Active = the last section whose top has passed the middle of the
    // screen, or the last section once the page is scrolled to the bottom.
    const update = () => {
      raf = 0;
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      let current = els[0];
      for (const el of els) {
        if (el.getBoundingClientRect().top <= window.innerHeight / 2) current = el;
      }
      if (atBottom) current = els[els.length - 1];
      if (current) setActive(current.id);
      setAtTop(window.scrollY < 80);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav className={atTop ? "pill-nav tucked" : "pill-nav"} aria-label="Sections">
      {items.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={active === id ? "on" : undefined}
          aria-current={active === id ? "true" : undefined}
        >
          {label}
        </a>
      ))}
    </nav>
  );
};

export default PillNav;
