import { mbaProjects } from "../data";
import Juicy from "./Juicy";

// The school card plus the newest two projects fill one row, which keeps the
// section short; the rest are on /mba/.
const SHOWN = 2;

const Mba = () => (
  <section className="page" id="mba" data-reveal>
    <h2 className="page-title">mba</h2>

    <ul className="mba-cards">
      <li className="mba-card mba-school">
        <h3 className="label">santa clara university · mba · in progress</h3>
        <p className="feature-name">leavey school of business</p>
        <p className="dim">
          Class projects from my MBA: case study presentations, product
          concepts and homework, each with a working demo.
        </p>
        <p className="mba-count">
          <strong>{mbaProjects.length}</strong> class projects so far
        </p>
        <p className="links">
          <a className="cta" href="/mba/">
            all class projects →
          </a>
        </p>
      </li>

      {mbaProjects.slice(0, SHOWN).map((p) => (
        <li key={p.slug} className="mba-card">
          <a href={`/mba/#${p.slug}`} aria-label={`${p.name}, details`}>
            <Juicy>
              <img src={p.image} alt={p.imageAlt} width="960" height="600" loading="lazy" />
            </Juicy>
          </a>
          <h3 className="label">{p.label}</h3>
          <a className="feature-name small" href={`/mba/#${p.slug}`}>
            {p.name}
          </a>
          <p className="dim">{p.blurb}</p>
          <p className="links">
            {p.links
              .filter((l) => l.primary)
              .map((l) => (
                <a key={l.href} href={l.href}>
                  {l.label}
                </a>
              ))}
          </p>
        </li>
      ))}
    </ul>
  </section>
);

export default Mba;
