import React from "react";
import sample from "../img/yoga.jpg";
import ContentCarousel from "./ContentCarausel";

const Content = () => {
  return (
    <div>
      <div className="marketing-Content">
        <div className="sub-titles">
          <h3>why chose us?</h3>
          <h1>what we can offer</h1>
        </div>
        <div className="marketing-content-options">
          <div className="content-options-img">
            <img src={sample} alt="classes options" />
            <span>class name</span>
          </div>
          <div className="content-options-img">
            <img src={sample} alt="classes options" />
            <span>class name</span>
          </div>
          <div className="content-options-img">
            <img src={sample} alt="classes options" />
            <span>class name</span>
          </div>
        </div>
      </div>
      <div className="marketing-content-info">
        <div className="content-info-wrapper">
          <p className="visit">Visit our classes and you wont't regret it!</p>
          <p>
            Whether you are actually a sportsmen, past sportmen, or simply wish
            to train like one
          </p>
        </div>
      </div>

      <div className="Carousel-wrapper">
        <h4>our team</h4>
        <h1>Meet the instructors</h1>
        <ContentCarousel />
      </div>
    </div>
  );
};

export default Content;
