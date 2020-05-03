import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="Footer">
      <footer>
        <h1>fitness anywhere</h1>
        <nav>
          <Link
            to="https://github.com/Build-Week-Anywhere-Fitness-04"
            target="_blank"
          >
            <FaGithub />
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
