import React, { useState, useEffect } from "react";
import Sharednav from "../Sharednav";
import { useHistory, useRouteMatch, useParams, Link } from "react-router-dom";
import { axiosWithAuth } from "../../../utils/axiosWithAuth";
import InstructorUpdateImage from "./InstrcutorUpdateImage";
import axios from "axios";
import profile from "../../../img/instructor.jpg";

const InstructorProfile = () => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { id } = useParams();
  const [img, setImg] = useState("");

  // const [value, setValues] = useState()

  // useEffect(() => {
  //    axiosWithAuth()
  //       .get(`/api/insructors/${id}`)
  //          .then(res => {

  //          })
  // }, [input])

  //   console.log("here ", img);
  const uploadImage = (e) => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append("upload_preset", "pl2czq6m");
    formData.append("file", files);

    axios
      .post(`https://api.cloudinary.com/v1_1/dedps0vtx/image/upload`, formData)
      .then((res) => {
        setImg(res.data.secure_url);
      })
      .catch((err) => [console.log(err)]);
  };

  const handleClick = () => {
    window.location.href = `https://connect.stripe.com/express/oauth/authorize?client_id=${process.env.REACT_APP_API_STRIPE_CLIENT_ID}&state=${id}${process.env.REACT_APP_API_STRIPE_STATE_VALUE}&suggested_capabilities[]=transfers&redirect_uri=https://fitness-anywhere.herokuapp.com/api/auth/instructors/stripe/connect/`;
  };
  return (
    <div>
      <Sharednav />
      <div className="InstructorProfile-wrapper">
        <div className="left-row">
          <div className="left-row-img">
            <img src={img} alt="" />
          </div>
          <p className="name">omar</p>
          <p>classes: 2</p>
        </div>

        <div className="profile-img-form">
          <InstructorUpdateImage uploadImage={uploadImage} img={img} />
          <button onClick={handleClick}>add card</button>
        </div>
      </div>
      <div className="go-back-btn">
        <Link to={`/account/instructor/${id}`}>go back</Link>
      </div>
    </div>
  );
};

export default InstructorProfile;
