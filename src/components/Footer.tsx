// src/components/Footer.tsx

import React from "react";
import "./Footer.scss"; // Assuming you're using SCSS for additional styling

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-auto text-center">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <a href="https://www.linkedin.com/in/arthur-s-lin">
                  <img src={"in.svg"} alt="LinkedIn" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://github.com/arthurslin">
                  <img src={"gh.svg"} alt="GitHub" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
