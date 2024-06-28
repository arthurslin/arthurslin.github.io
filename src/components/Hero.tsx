import { motion } from "framer-motion";
import "./Hero.scss";
const Hero = () => {
  return (
    <div className="hero-section vh-100 d-flex align-items-center justify-content-center text-center">
      <div className="container">
        <div className="row w-100">
          <div className="col-md-6">
            <motion.img
              src="arthur.jpg"
              alt="Profile Picture"
              className="profile-image img-fluid rounded-circle"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                boxShadow: [
                  "0 0 10px rgba(255, 255, 255, .5)",
                  "0 0 10px rgba(255, 255, 255, 1)",
                  "0 0 10px rgba(255, 255, 255, .5)",
                ],
              }}
              transition={{ duration: 1 }}
            />
          </div>
          <div className="col-md-6 d-flex flex-column align-items-start justify-content-center">
            <motion.h1
              className="hero-title mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Welcome to My Portfolio!
            </motion.h1>
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              UCSC Computer Science: Game Design B.S. Graduate.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
