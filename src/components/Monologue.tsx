import React from "react";
import "./Monologue.scss";
const Monologue: React.FC = () => {
  return (
    <section className="about-me">
      <div className="container py-5">
        <h2 className="monologue-title text-center mb-4">About Me</h2>
        <p className="monologue-text text-center">
          I'm a recent UC Santa Cruz grad with a Computer Science: Game Design
          degree. I value collaboration and continuous learning, aiming to solve
          complex problems through innovative technology solutions. Outside of
          my professional interests, I find joy in spending time with my feline
          friends and keeping fit through workouts. In essence, I am a software
          engineer with a love for games, a knack for solving puzzles, and a
          soft spot for cats and fitness.
        </p>
      </div>
    </section>
  );
};

export default Monologue;
