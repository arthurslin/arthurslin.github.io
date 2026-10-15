import { links } from "../data";

const Home = () => (
  <section className="home" id="home">
    <h1 className="name">arthur lin</h1>

    <div className="grid">
      <div className="block b-tldr">
        <h2>tldr</h2>
        <p>
          I work where engineering meets business: configuring how products
          get quoted and sold by day, shipping my own games by night, and
          studying strategy at Santa Clara.
        </p>
      </div>

      <figure className="block b-photo">
        <h2>me</h2>
        <img src="arthur.webp" alt="Portrait of Arthur Lin" width="720" height="1254" />
      </figure>

      <div className="block b-today">
        <h2>today</h2>
        <p>
          Earning my <strong>MBA</strong> at{" "}
          <a href="https://www.scu.edu/business/" target="_blank" rel="noopener">
            Santa Clara University
          </a>
          , Leavey School of Business. Adding strategy, finance, and product
          thinking to an engineering background.
        </p>
      </div>

      <div className="block b-shipping">
        <h2>shipping</h2>
        <p>
          Releasing{" "}
          <a href="#games">Meow Ball Rush</a>, my solo-built Android game.
          Roll up a giant ball of cats and take on 12 bosses. It's in{" "}
          <a href={links.meowTest}>closed testing</a> on Google Play now.
        </p>
      </div>

      <div className="block b-yesterday">
        <h2>yesterday</h2>
        <p>
          CPQ Analyst at Onto Innovation, automating data analysis for field
          service, R&amp;D, and logistics teams. Before that, Computer Science:
          Game Design at UC Santa Cruz.
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
