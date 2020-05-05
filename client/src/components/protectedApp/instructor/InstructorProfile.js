import React, { useState, useEffect } from "react";
import Sharednav from "../Sharednav";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";
import { axiosWithAuth } from "../../../utils/axiosWithAuth";

const InstructorProfile = () => {
  const history = useHistory();
  const { id } = useParams();
  // const [value, setValues] = useState()

  // useEffect(() => {
  //    axiosWithAuth()
  //       .get(`/api/insructors/${id}`)
  //          .then(res => {

  //          })
  // }, [input])

  const handleClick = () => {
    window.location.href = `https://connect.stripe.com/express/oauth/authorize?client_id=${process.env.REACT_APP_API_STRIPE_CLIENT_ID}&state=${id}${process.env.REACT_APP_API_STRIPE_STATE_VALUE}&suggested_capabilities[]=transfers&redirect_uri=https://fitness-anywhere.herokuapp.com/api/auth/instructors/stripe/connect/`;
  };
  return (
    <div>
      <Sharednav />
      <div className="InstructorProfile-wrapper">
        <h2>here</h2>
        <button onClick={handleClick}>add card</button>
      </div>
    </div>
  );
};

export default InstructorProfile;
