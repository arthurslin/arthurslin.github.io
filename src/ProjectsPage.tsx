import { useEffect } from "react";
import Background from "./components/Background";
import PillNav from "./components/PillNav";
import Footer from "./components/Footer";
import Juicy from "./components/Juicy";
import { useReveal } from "./components/useReveal";
import { projects } from "./data";

// Off-site links open in a new tab; links within this site don't.
const external = (href: string) =>
  href.startsWith("http") && !href.startsWith("https://arthurslin.github.io/")
    ? { target: "_blank", rel: "noopener" }
    : {};

// /projects/: every project, alternating image sides, in the home page's style.
function ProjectsPage() {
  useReveal();
  // The page renders after load, so the browser can't jump to a #project
  // link from the home page by itself.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);
  return (
    <>
      <Background />
      <main className="wrap">
        <header className="projects-head">
          <a className="back" href="/">
            ← arthur lin
          </a>
          <h1 className="name">projects</h1>
          <p className="dim projects-intro">
            Games and tools I've designed and built, mostly solo. Everything here
            is live, so click through and try it.
          </p>
        </header>

        <ol className="project-list">
          {projects.map((p, i) => (
            <li key={p.slug} id={p.slug} className="project" data-reveal>
              <Juicy className="project-img">
                <img src={p.image} alt={p.imageAlt} loading={i < 2 ? "eager" : "lazy"} />
              </Juicy>
              <div className="project-copy">
                <h2 className="label">
                  <span className="project-num">{String(i + 1).padStart(2, "0")}</span>
                  {p.label}
                </h2>
                <p className="feature-name">{p.name}</p>
                <p>{p.blurb}</p>
                {p.detail && <p className="dim">{p.detail}</p>}
                <p className="links">
                  {p.links.map((l) => (
                    <a key={l.href} className={l.primary ? "cta" : undefined} href={l.href} {...external(l.href)}>
                      {l.label}
                    </a>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </main>
      <Footer />
      <PillNav page="projects" />
    </>
  );
}

export default ProjectsPage;
