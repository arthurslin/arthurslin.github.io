import { useEffect, useState } from "react";

// The home section can't use id="root": React mounts the app on #root.
const items = [
  { id: "home", label: "root" },
  { id: "work", label: "work" },
  { id: "games", label: "games" },
  { id: "contact", label: "contact" },
];

// Floating nav that highlights whichever section is in view.
const PillNav = () => {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const els = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="pill-nav" aria-label="Sections">
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
