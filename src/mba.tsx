import React from "react";
import ReactDOM from "react-dom/client";
import ProjectsPage from "./ProjectsPage.tsx";
import { mbaProjects } from "./data";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProjectsPage
      title="mba class projects"
      intro={
        <>
          Presentations, concepts and homework from my MBA at the Leavey School
          of Business, Santa Clara University. Each one links to a working demo.
        </>
      }
      items={mbaProjects}
      nav="mba"
    />
  </React.StrictMode>,
);
