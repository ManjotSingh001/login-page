import React from 'react';
import './style.css';

const staff = () => {
  return (
    <div>
      <div className="nav-container">
        <div className="wrapper">
          <nav>
            <ul className="nav-items">
              <li>
                <a href="index.html"> HOME</a>
              </li>
              <li>
                <a href="https://www.gndec.ac.in/">COLLEGE WEBSITE</a>
              </li>
              <li>
                <a href="contact.html"> CONTACT US</a>
              </li>
              <li>
                <a href="about.html"> ABOUT US</a>
              </li>
              <li>
                <a href="logout.html"> LOGOUT</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="header-container">
        <div className="wrapper">
          <header>
            <div className="hero-content">
              <h1>Welcome,</h1>
              <h2>Diksha Sharma</h2>
              <a href="requests-ce.html">CE</a>
              <a href="requests-ee.html">EE</a>
              <a href="requests-mech&pro.html">ME & PRO</a>
              <a href="requests-ece.html">ECE</a>
              <a href="requests-cse.html">CSE</a>
              <a href="requests-mba.html">MBA</a>
              <a href="requests-it.html">IT</a>
              <a href="requests-bca.html">BCA</a>
            </div>
            <div className="photo-bg"></div>
          </header>
        </div>
      </div>
    </div>
  );
};

export default staff;
