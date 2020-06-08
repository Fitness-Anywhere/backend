import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { getDate, getWeekDay, getTime } from "../../../utils/dateFunctions";

const SingleResult = ({ cls, joinClass }) => {
  const { id, duration, image_url, name, price, start_time } = cls;
  const { url } = useRouteMatch();

  return (
    <div className="InstructorCardClass">
      <Link to={`/${url}/${id}/more-info`}>
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
          <p className="starts">{getDate(start_time)}<br/>{getWeekDay(start_time)}</p>
          <p className="starts">{getTime(start_time)}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleResult;
