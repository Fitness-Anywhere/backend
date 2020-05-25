import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import img1 from "../img/marketing1.jpg";
import img2 from "../img/marketing2.jpg";

const ContentCarausel = () => {
  return (
    <div id="Carousel">
      <Carousel>
        <Carousel.Item>
          <img src={img1} alt="First slide" />
          <Carousel.Caption>
            <h5>First slide label</h5>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img src={img2} alt="Third slide" />

          <Carousel.Caption>
            <h5>Second slide label</h5>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default ContentCarausel;
