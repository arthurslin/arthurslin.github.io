import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Header.scss";

const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        <motion.a
          className="navbar-brand"
          href="#"
          initial={{ x: -100, opacity: 0, scale: 0.95 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, yoyo: Infinity, repeatDelay: 0.5 }}
        >
          Arthur Lin
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/in/arthur-s-lin"
          initial={{ x: -100, opacity: 0, scale: 0.95 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, yoyo: Infinity, repeatDelay: 0.5 }}
          whileHover={{ scale: 1.1 }}
        >
          <img src="in.svg" alt="LinkedIn" className="ms-3" />
        </motion.a>
        <motion.a
          href="https://github.com/arthurslin"
          initial={{ x: -100, opacity: 0, scale: 0.95 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, yoyo: Infinity, repeatDelay: 0.5 }}
          whileHover={{ scale: 1.1 }}
        >
          <img src="gh.svg" alt="GitHub" className="ms-3" />
        </motion.a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <motion.div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
          initial={{ x: -100, opacity: 0, scale: 0.95 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, yoyo: Infinity, repeatDelay: 0.5 }}
        >
          <ul className="navbar-nav">
            <motion.li
              className="nav-item"
              initial={{ x: -100, opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, yoyo: Infinity, repeatDelay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link className="nav-link" to="/">
                Home
              </Link>
            </motion.li>
            <motion.li
              className="nav-item"
              initial={{ x: -100, opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, yoyo: Infinity, repeatDelay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link className="nav-link" to="/about">
                About
              </Link>
            </motion.li>
            <motion.li
              className="nav-item"
              initial={{ x: -100, opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, yoyo: Infinity, repeatDelay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link className="nav-link" to="/projects">
                Projects
              </Link>
            </motion.li>
            <motion.li
              className="nav-item"
              initial={{ x: -100, opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, yoyo: Infinity, repeatDelay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link className="nav-link" to="/skills">
                Skills
              </Link>
            </motion.li>
            <motion.li
              className="nav-item"
              initial={{ x: -100, opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, yoyo: Infinity, repeatDelay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </motion.li>
          </ul>
        </motion.div>
      </div>
    </nav>
  );
};

export default Header;
