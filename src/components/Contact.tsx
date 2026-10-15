import { links } from "../data";

const Contact = () => (
  <section className="page contact" id="contact" data-reveal>
    <h2 className="page-title">contact</h2>
    <div className="grid">
      <div className="block">
        <h2>say hi</h2>
        <p>
          Always happy to talk product, games, tech strategy, or cats. Email is
          the best way to reach me.
        </p>
        <p className="email">
          <a href={`mailto:${links.email}`}>{links.email}</a>
        </p>
      </div>
      <div className="block">
        <h2>elsewhere</h2>
        <ul className="plain">
          <li>
            <a href={`mailto:${links.email}`}>email</a>
          </li>
          <li>
            <a href={links.linkedin} target="_blank" rel="noopener">
              linkedin
            </a>
          </li>
          <li>
            <a href={links.github} target="_blank" rel="noopener">
              github
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export default Contact;
