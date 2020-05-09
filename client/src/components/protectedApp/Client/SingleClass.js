import React from "react";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import { convertingTime } from "../../../helperFunctions/convertingTime";

const InstructorCardClass = ({ cls, joinClass }) => {
  const { duration, image_url, name, price, start_time } = cls;
  const class_id = cls.id;
  const { url } = useRouteMatch();
  const { id } = useParams();

  const time = convertingTime(start_time);

  return (
    <div className="InstructorCardClass">
      <Link to={`/account/client/${id}/${class_id}/more-info`}>
        <div className="InstructorCardClass-img">
          <img src={image_url} alt="doing yoga" />
        </div>
      </Link>
      <div className="InstructorCardClass-description">
        <div className="Instructor-top-row">
          <p className="name">{name}</p>
          <p className="price">${price}</p>
        </div>
        <p className="duration">
          <span>{duration}</span> mins
        </p>
        <div className="bottom-row">
          <p className="starts">{time}</p>
        </div>
      </div>
    </div>
  );
};

export default InstructorCardClass;
