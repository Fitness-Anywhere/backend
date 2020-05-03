import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Sharednav from "../Sharednav";
import { convertingTime } from "../../../helperFunctions/convertingTime";

const InstructorSingleClass = () => {
  const { c_id } = useParams();
  const reducer = useSelector((state) => ({
    ...state,
  }));
  const { instructorClass } = reducer.userReducer;
  const findClass = instructorClass.find(
    (single) => single.id === Number(c_id)
  );

  const {
    instructor_id,
    description,
    duration,
    image_url,
    intensity,
    location,
    max_class_size,
    name,
    price,
    start_time,
    type,
    //  status,
  } = findClass;

  const time = convertingTime(start_time);
  return (
    <div>
      <Sharednav />
      <div className="InstructorSingleClass">
        <div className="wrapper-class">
          <div className="InstructorSingleClass-wrapper">
            <div className="img-wrapper">
              <img src={image_url} alt={name} />
            </div>
            <div className="right-side">
              <p className="name">
                Class name:
                <span>{name}</span>
              </p>
              <p className="address">
                Location:
                <span>{location}</span>
              </p>
              <p className="intensity">
                Intensity:
                <span>{intensity}</span>
              </p>
              <p className="max-size">
                Class Size:
                <span>{max_class_size}</span>
              </p>
              <p className="price">
                Price:
                <span>${price}</span>
              </p>
              <p className="start">
                Starts at:
                <span>{time}</span>
              </p>
              <p className="type">
                Class type:
                <span>{type}</span>
              </p>
              <p className="duration">
                Class duration:
                <span>{duration} mins</span>
              </p>
            </div>
          </div>
          <div className="bottom-description">
            <div className="InstructorSingleClass-description">
              <h2>About the class</h2>
              <span>description</span>
              <p>{description}</p>
            </div>
            <div className="goback-btn">
              <Link to={`/account/instructor/${instructor_id}`}>Go back</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSingleClass;
