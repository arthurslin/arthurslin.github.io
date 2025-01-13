import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Project, projectsData } from "./ProjectData";
import "./Projects.scss";

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Projects: React.FC = () => {
  return (
    <div className="projects-container">
      <h2 className="projects-title text-center mt-5">Projects</h2>
      <div className="projects-grid container d-flex align-items-center justify-content-center">
        <div className="row">
          {projectsData.map((project) => (
            <AnimatedProject key={project.title} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

const AnimatedProject: React.FC<{ project: Project }> = ({ project }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className="project-item mt-3 mb-3"
      variants={itemVariants}
      initial="hidden"
      animate={controls}
      transition={{ duration: 1 }}
    >
      <div className="flip flip-vertical">
        <div className="front">
          <img
            src={project.image}
            alt={project.title}
            style={{ width: "100%", height: "100%" }}
            className="project-image img-fluid"
          />
        </div>
        <div className="back">
          <div className="project-details">
            <h5 className="project-title">{project.title}</h5>
            <p className="project-description">{project.description}</p>
            {project.link && (
              <a className="project-link" href={project.link}>
                Link
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
