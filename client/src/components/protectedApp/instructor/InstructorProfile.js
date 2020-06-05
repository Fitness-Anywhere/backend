import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sharednav from "../Sharednav";
import { useParams, Link } from "react-router-dom";
import { axiosWithAuth } from "../../../utils/axiosWithAuth";
import InstructorUpdateImage from "./InstrcutorUpdateImage";
import axios from "axios";
// import profile from "../../../img/instructor.jpg";

const InstructorProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { instructorUpdatedProfile } = useSelector(
    (state) => state.instructorProfileReducer
  );
  const [img, setImg] = useState("");

  const { username } = instructorUpdatedProfile;

  useEffect(() => {
    dispatch({ type: "GETTING_INSTRUCTOR_UPDATED_INFO" });
    axiosWithAuth()
      .get(`/api/instructors/${id}`)
      .then((res) => {
        //   console.log("res ", res);
        dispatch({ type: "SAVING_INSTRUCTOR_UPDATED_INFO", payload: res.data });
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch({
          type: "SAVING_INSTRUCTOR_UPDATED_ERROR",
          payload: err.response.data,
        });
      });
  }, [dispatch, id]);
  useEffect(() => {
    if (img) {
      dispatch({ type: "UPDATING_INSTRUCTOR_IMG" });
      axiosWithAuth()
        .patch(`/api/instructors/${id}`, { image_url: img })
        .then((res) => {
          dispatch({ type: "SAVING_INSTRUCTOR_IMG", payload: res.data });
        })
        .catch((err) => {
          console.log(err.response.data);
          dispatch({
            type: "SAVING_INSTRUCTOR_IMG_ERROR",
            payload: err.response.data,
          });
        });
    }
  }, [img, dispatch]);

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
            <img src={instructorUpdatedProfile.image_url} alt="" />
          </div>
          <p className="name">{username}</p>
          {/**
           <p>classes: 2</p>
         */}
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
