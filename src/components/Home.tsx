import { links } from "../data";
import Juicy from "./Juicy";

const Home = () => (
  <section className="home" id="home">
    <h1 className="name">arthur lin</h1>

    <div className="grid">
      <div className="block b-tldr">
        <h2>about me</h2>
        <p>
          I’m Arthur, and I work as a CPQ Analyst in the semiconductor industry
          while getting my MBA at Santa Clara University at night. I studied
          computer science and game design, so I like figuring out how things
          work and fit together. Outside of work, I play chess, check out new
          places, and love meeting people and hearing their stories.
        </p>
        <a className="status open-to" href={`mailto:${links.email}`}>
          <span className="status-dot" aria-hidden="true" />
          <span className="status-text">
            <span className="status-title">open to new roles</span>
            <span className="status-sub">business systems analyst · bay area</span>
          </span>
        </a>
      </div>

      <figure className="block b-photo">
        <h2>me</h2>
        <Juicy>
          <img src="arthur.webp" alt="Portrait of Arthur Lin" width="720" height="1254" />
        </Juicy>
      </figure>

      <div className="block b-today">
        <h2>today</h2>
        <p>
          Earning my <strong>MBA</strong> at the Leavey School of Business,{" "}
          <a href="https://www.scu.edu/business/" target="_blank" rel="noopener">
            Santa Clara University
          </a>
          . A computer science degree taught me how systems work; the MBA is
          teaching me how the business runs on them.
        </p>
      </div>

      <div className="block b-shipping">
        <h2>recent win</h2>
        <p>
          Built a Power Automate and AI Builder workflow that takes in CPQ
          issues, suggests the fix and routes approvals. In pilot, it already
          saves about <strong>2 hours a day</strong> of manual handoffs.
        </p>
      </div>

      <div className="block b-yesterday">
        <h2>by day</h2>
        <p>
          CPQ Analyst at Onto Innovation, a global semiconductor company. I own
          configuration for 99% of a 90+ model catalog and translate between
          sales, engineering and offshore developers.
        </p>
      </div>

      <div className="block b-bg">
        <h2>in the background</h2>
        <a className="status" href={links.meowTest}>
          <img src="meowballrush/icon-192.webp" alt="" width="36" height="36" />
          <span className="status-text">
            <span className="status-title">meow ball rush</span>
            <span className="status-sub">closed testing · needs testers</span>
          </span>
          <span className="status-bar" aria-hidden="true">
            <span />
          </span>
        </a>
      </div>
    </div>
  </section>
);

export default Home;
