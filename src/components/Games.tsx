import { links } from "../data";
import Juicy from "./Juicy";

const shots = [
  { src: "meowballrush/shot-1.webp", alt: "Rolling a giant ball of cats down a candy-striped road" },
  { src: "meowballrush/shot-2.webp", alt: "A boss fight" },
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
          and beat 12 bosses across 8 worlds.
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

    <article className="minor">
      <Juicy className="minor-img">
        <img src="gboheader.jpg" alt="" loading="lazy" />
      </Juicy>
      <div>
        <h3 className="label">team project · multiplayer</h3>
        <p className="feature-name small">golf bash online</p>
        <p>
          A silly online golf party game. Grab your clubs and battle your
          friends through a round of golf.
        </p>
        <p className="links">
          <a href="https://aguizaro.github.io/GolfSite/" target="_blank" rel="noopener">
            visit site →
          </a>
        </p>
      </div>
    </article>
  </section>
);

export default Games;
