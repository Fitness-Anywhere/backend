import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RiAccountCircleLine } from "react-icons/ri";
import { axiosWithAuth } from "../../../utils/axiosWithAuth";
import Sharednav from "../Sharednav";
import ClientJoined from "./ClientJoined";

const ClientProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [update, setUpdate] = useState("");
  const [clientName, setClientName] = useState({
    first_name: "",
    last_name: "",
  });
  const reducer = useSelector((state) => state.clientReducer.classesJoined);
  /// testing
  useEffect(() => {
    axiosWithAuth()
      .get(`api/clients/${id}`)
      .then((res) => {
        const fullName = {
          first_name: res.data.first_name,
          last_name: res.data.last_name,
        };
        setClientName(fullName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    dispatch({ type: "FETCHING_RERENDER_CLASSES" });
    axiosWithAuth()
      .get(`/api/clients/${id}/classes`)
      .then((res) => {
        dispatch({ type: "RERENDERING_JOINED_CLASSES", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "ERROR_RERENDERING_JOINED_CLASSES", payload: err });
      });
  }, [update, dispatch, id]);

  const deletedJoined = (item) => {
    const class_id = item.id;
    axiosWithAuth()
      .delete(`api/clients/${id}/classes/${class_id}`)
      .then((res) => {
        setUpdate(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="ClientProfile">
      <Sharednav />
      <div className="ClientProfile-wrapper">
        <div className="profile-icon">
          <p>{`${clientName.first_name} ${clientName.last_name}`}</p>
          <RiAccountCircleLine />
        </div>
        <div className="flex">
          <h2>Schedule</h2>
          <div className="toggle-message">
            {reducer.length === 0 && (
              <p>looks like you haven't join any classes yet.</p>
            )}

            <div className="find-classes">
              <Link to={`/account/client/${id}`}>find classes</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="show-joined-classes">
        {reducer.map((cls) => (
          <ClientJoined
            key={cls.id}
            cls={cls}
            deletedJoined={() => deletedJoined(cls)}
          />
        ))}
      </div>
    </div>
  );
};

export default ClientProfile;
