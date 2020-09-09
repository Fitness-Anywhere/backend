import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { axiosWithAuth } from "../../../utils/axiosWithAuth";
import Navbar from "./Navbar";
import Header from "./Header";
import ClientDisplayClasses from "./ClientDisplayClasses";

import MainStripe from "../stripe/MainStripe";
import { Container } from "@material-ui/core";

// toggle class for joined client

const ClientHomePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [classesToJoin, setClassesToJoin] = useState([]);
  const { allClasses, classesJoined } = useSelector(state => state.clientReducer);

  useEffect(() => {
    if(allClasses?.length) {
      classesJoined?.length ? 
        setClassesToJoin(
          allClasses?.filter(cls => 
            classesJoined?.findIndex(joined => joined.id === cls.id) === -1)
        )
      :
      setClassesToJoin(allClasses);
    }
  }, [allClasses, classesJoined]);

  useEffect(() => {
    dispatch({ type: "FETCHING_CLIENT_CLASSES" });
    axiosWithAuth()
      .get(`/api/classes`)
      .then((res) => {
        const classes = res.data.filter(cls => {
          const classDate = new Date(cls.start_time);
          return classDate > Date.now();
        });
        
        dispatch({ type: "SAVING_CLIENT_CLASSES", payload: classes });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "SAVING_ERROR", payload: err });
      });
  }, [dispatch, classesJoined]);

  useEffect(() => {
    dispatch({ type: "FETCHING_CLASSES_JOINED" });
    axiosWithAuth()
      .get(`/api/clients/${id}/classes`)
      .then((res) => {
        dispatch({ type: "SAVING_JOINED_CLASSES", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "ERROR_SAVING_JOINED_CLASSES", payload: err });
      });
  }, [dispatch, id]);

  const joinClass = (item) => {
    //  console.log("here ", item);
    const class_id = item.id;
    axiosWithAuth()
      .post(`/api/clients/${id}/classes`, { class_id })
      .then((res) => {
        dispatch({ type: "CLIENT_JOINED_CLASS" });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Navbar />
      <Header />
      <Container>
        <ClientDisplayClasses allClasses={classesToJoin} joinClass={joinClass} />
      </Container>
    </div>
  );
};

export default ClientHomePage;
