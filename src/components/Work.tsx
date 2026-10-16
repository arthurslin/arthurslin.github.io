import { jobs, schools } from "../data";

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

// "May 2024" -> months since year 0, so two dates can be subtracted.
function toMonths(label: string) {
  const [mon, year] = label.split(" ");
  return Number(year) * 12 + MONTHS.indexOf(mon.slice(0, 3).toLowerCase());
}

// LinkedIn-style length, counting both the start and end month: "1 yr 6 mos".
function duration(start: string, end?: string) {
  const now = new Date();
  const endMonths = end ? toMonths(end) : now.getFullYear() * 12 + now.getMonth();
  const total = endMonths - toMonths(start) + 1;
  const yrs = Math.floor(total / 12);
  const mos = total % 12;
  const parts = [];
  if (yrs) parts.push(`${yrs} ${yrs === 1 ? "yr" : "yrs"}`);
  if (mos) parts.push(`${mos} ${mos === 1 ? "mo" : "mos"}`);
  return parts.join(" ");
}

const Work = () => (
  <section className="page" id="work" data-reveal>
    <h2 className="page-title">work</h2>
    <ol className="rows">
      {jobs.map((j) => (
        <li key={j.company} className="row">
          <span className="row-when">
            {j.start} – {j.end ?? "now"}
            <span className="row-len">{duration(j.start, j.end)}</span>
          </span>
          <span className="row-what">
            <span className="row-title">
              {j.role} <span className="dim">@ {j.company}</span>
            </span>
            <span className="row-len">{j.location}</span>
            {j.highlights.length === 1 ? (
              <span className="row-desc">{j.highlights[0]}</span>
            ) : (
              <ul className="row-desc row-list">
                {j.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
          </span>
        </li>
      ))}
      {schools.map((s) => (
        <li key={s.school} className="row">
          <span className="row-when">{s.when}</span>
          <span className="row-what">
            <span className="row-title">
              {s.degree} <span className="dim">@ {s.school}</span>
            </span>
            {s.note && <span className="row-desc">{s.note}</span>}
          </span>
        </li>
      ))}
    </ol>
  </section>
);

export default Work;
