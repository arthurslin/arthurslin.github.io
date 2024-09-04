import React, { useEffect } from "react";
import { workplaces } from "./Experiences";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import "./AboutSection.scss";

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

const AboutSection: React.FC = () => {
  return (
    <div className="container">
      <h2 className="experience-text text-center mt-5">Work Experiences</h2>
      <div className="d-flex flex-column align-items-center">
        {workplaces.map((workplace) => (
          <AnimatedItem key={workplace.title} workplace={workplace} />
        ))}
      </div>
    </div>
  );
};

const AnimatedItem: React.FC<{ workplace: typeof workplaces[0] }> = ({ workplace }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
    if (!inView) {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className="col-md-10 d-flex flex-column align-items-center"
      variants={itemVariants}
      initial="hidden"
      animate={controls}
      transition={{ duration: 1 }}
    >
      <div className="col-md-4 mb-4 d-flex justify-content-center align-items-center">
        <img
          src={workplace.image}
          alt={workplace.title}
          style={{ width: `${workplace.size}%`, height: `${workplace.size}%` }}
          className="workplace-image img-fluid"
        />
      </div>
      <div className="col-md-8">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="title-text">
              {workplace.jobTitle} at {workplace.title}
            </h5>
            <p className="card-text">{workplace.description}</p>
            <small className="date-text">
              {workplace.dateStart} -{" "}
              {workplace.dateEnd? workplace.dateEnd : "Current"}
            </small>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutSection;
