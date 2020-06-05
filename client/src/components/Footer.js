import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="Footer">
      <footer>
        <h1>fitness anywhere</h1>
        <nav>
          <a
            href="https://github.com/Fitness-Anywhere/App"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </nav>
      </footer>
      <p className="developed">
        Fitness Anywhere was developed by <span>Anthony Amaro</span> and{" "}
        <span>Fabricio Bezerra</span>.
      </p>
    </div>
  );
};

export default Footer;
