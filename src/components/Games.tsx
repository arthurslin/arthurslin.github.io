import { links, projects } from "../data";
import Juicy from "./Juicy";

const shots = [
  { src: "meowballrush/shot-1.webp", alt: "Rolling a giant ball of cats down a candy-striped road" },
  { src: "meowballrush/shot-2.webp", alt: "Boss fight against Vacuum 9000 in Neon Nekotown" },
  { src: "meowballrush/shot-4.webp", alt: "The rainbow Catnip Frenzy power-up" },
];

const steps = [
  { label: "built", state: "done" },
  { label: "closed testing", state: "current" },
  { label: "public launch", state: "next" },
];

const Games = () => (
  <section className="page" id="projects" data-reveal>
    <h2 className="page-title">projects</h2>

    <article className="feature">
      <div className="feature-copy">
        <h3 className="label">featured · android · 2026</h3>
        <p className="feature-name">meow ball rush</p>
        <p>
          An endless runner where you start as one tiny cat and roll up a
          mountain of them. Pick the right gates, bonk dogs, launch off ramps,
          and beat 14 bosses across 11 worlds.
        </p>
        <p className="dim">
          Designed, coded, and shipped solo. HTML5 Canvas + JavaScript, wrapped
          for Android with Capacitor. All sound is synthesized in code. AdMob and
          Google Play Billing for monetization.
        </p>

        <ol className="launch" aria-label="Release progress">
          {steps.map((s) => (
            <li key={s.label} className={`is-${s.state}`}>
              {s.label}
              {s.state === "current" && <span className="sr-only"> (current stage)</span>}
            </li>
          ))}
        </ol>

        <p className="links">
          <a className="cta" href={links.meowTest}>
            become a tester →
          </a>
          <a href={links.meowPlay} target="_blank" rel="noopener">
            play store
          </a>
          <a href={links.meowPrivacy}>privacy</a>
        </p>
      </div>
      <div className="shots">
        {shots.map((s) => (
          <Juicy key={s.src}>
            <img src={s.src} alt={s.alt} width="360" height="640" loading="lazy" />
          </Juicy>
        ))}
      </div>
    </article>

    <h3 className="label more-label">more projects</h3>
    <ul className="rows">
      {projects.slice(1).map((p) => (
        <li key={p.slug} className="row">
          <span className="row-when">{p.label}</span>
          <span className="row-what">
            <a className="row-title" href={`/projects/#${p.slug}`}>
              {p.name}
            </a>
            <span className="row-desc">{p.blurb}</span>
          </span>
        </li>
      ))}
    </ul>
    <p className="links more-links">
      <a className="cta" href="/projects/">
        see all projects →
      </a>
    </p>
  </section>
);

export default Games;
