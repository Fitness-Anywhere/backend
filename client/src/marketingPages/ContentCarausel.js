import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";

const ContentCarausel = ({ instructorsInfo }) => {
  return (
    <div id="Carousel">
      <Carousel>
        {instructorsInfo.map((inst) => (
          <Carousel.Item key={inst.id}>
            <img src={inst.image_url} alt="First slide" />
            <Carousel.Caption>
              <h5>{inst.first_name}</h5>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ContentCarausel;
