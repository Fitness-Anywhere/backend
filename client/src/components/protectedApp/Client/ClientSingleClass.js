import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { convertingTime } from "../../../helperFunctions/convertingTime";
import Sharednav from "../Sharednav";
import GoogleMap from "../googleMap";
import ClientModel from "./ClientModel";

const ClientSingleClass = () => {
  const { id, c_id } = useParams();
  const reducer = useSelector((state) => ({
    ...state,
  }));
  const { allClasses } = reducer.clientReducer;
  const findClass = allClasses.find((single) => single.id === Number(c_id));

  const {
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
  } = findClass;

  const time = convertingTime(start_time);
  //   const have = start_time.split("T");
  //   const convert = new Date(have[1]);
  //   const t = convert.toLocaleTimeString().split(":");
  //   const am = t.slice(-1)[0].split(" ")[1];
  //   const times = `${t[0]}:${t[1]} ${am}`;
  //   console.log("times ", start_time);
  //   const time = "";
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
              <div id="buy-btn">
                <ClientModel data={findClass} />
              </div>
            </div>
          </div>
          <div className="bottom-description">
            <div className="InstructorSingleClass-description">
              <h2>About the class</h2>
              <span>description</span>

              <p>{description}</p>
            </div>
            <div className="goback-btn">
              <Link to={`/account/client/${id}`}>Go back</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="googleMap-wrapper">
        <GoogleMap location={location} />
      </div>
    </div>
  );
};

export default ClientSingleClass;
