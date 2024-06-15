import React, { useState } from 'react';
import './navbar.css';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navItems = ['Contact', 'Projects', 'Skills', 'About'];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">AL</a>
        <ul className="navbar-nav ms-auto">
          {navItems.map((item, index) => (
            <li key={index} className={`nav-item ${selectedIndex === index ? 'active' : ''}`}>
              <a className="nav-link" href="#" onClick={() => setSelectedIndex(index)}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
