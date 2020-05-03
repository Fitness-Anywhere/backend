import React from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { convertingTime } from "../../../helperFunctions/convertingTime";

const InstructorCardClass = ({ clss, deleteClass }) => {
  const { id, duration, image_url, name, price, start_time } = clss;

  const { url } = useRouteMatch();
  const history = useHistory();

  const time = convertingTime(start_time);
  const editBtn = () => {
    history.push(`${url}/edit/${id}`);
  };
  return (
    <div className="InstructorCardClass">
      <Link to={`${url}/${id}/more-info`}>
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
          <div className="icons">
            <div className="edit" onClick={editBtn}>
              <AiOutlineEdit />
            </div>
            <div className="del" onClick={deleteClass}>
              <AiOutlineDelete />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorCardClass;
