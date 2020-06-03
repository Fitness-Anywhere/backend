import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentCarousel from "./ContentCarausel";
import ContentClassImgs from "./ContentClassImgs";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Content = () => {
  const dispatch = useDispatch();
  const { homepageClasses, instructorsInfo } = useSelector(
    (state) => state.homepageReducer
  );

  useEffect(() => {
    dispatch({ type: "FETCHING_HOMEPAGE_CLASSES" });
    axiosWithAuth()
      .get("/api/classes")
      .then((res) => {
        dispatch({ type: "SAVING_HOMEPAGE_CLASSES", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "HOMEPAGE_CLASS_ERROR",
          payload: err.response.data.errorMessage,
        });
      });
  }, []);

  useEffect(() => {
    dispatch({ type: "FETCHING_INSTRUCTORS" });
    axiosWithAuth()
      .get(`/api/instructors`)
      .then((res) => {
        dispatch({ type: "SAVING_ALL_INSTRUCTORS", payload: res.data });
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch({
          type: "SAVING_ALL_INSTRUCTORS_ERROR",
          payload: err.response.data,
        });
      });
  }, []);
  return (
    <div>
      <div className="marketing-Content">
        <div className="sub-titles">
          {/**
          <h3>why chose us?</h3>
         */}
          <h3>why chose us?</h3>
          <h1>what we can offer</h1>
        </div>
        <div className="marketing-content-options">
          {homepageClasses.map((cls) => (
            <ContentClassImgs key={cls.id} cls={cls} />
          ))}
        </div>
      </div>
      <section className="about-our-web">
        <h1>Work our at home</h1>
        <p>
          If you want more guidance or additional tools to get the most out of
          all the content available, we also have low-cost, professionally
          developed programs and meal plans to follow, monthly workout
          challenges, and a growing list of advanced features for planning and
          tracking your workouts.
        </p>
      </section>
      <div className="marketing-content-info">
        <div className="content-info-wrapper">
          <p className="visit">Visit our classes and you wont't regret it!</p>
          <p>
            Whether you are actually a sportsmen, past sportmen, or simply wish
            to train like one
          </p>
        </div>
      </div>

      <div className="Carousel-wrapper">
        <h4>our team</h4>
        <h1>Meet the instructors</h1>

        <ContentCarousel instructorsInfo={instructorsInfo} />
      </div>
    </div>
  );
};

export default Content;
