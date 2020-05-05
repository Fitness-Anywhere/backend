// REACT I only
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialValues = {
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  instructorOrClient: "",
};

function SignUp() {
  const history = useHistory();
  const { register, errors, handleSubmit, reset } = useForm({ initialValues });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.credentialReducer);

  // POST / api / auth / instructors / register
  // POST / api / auth / clients / register
  // instructorOrClient
  const onSubmit = (values) => {
    const {
      username,
      first_name,
      last_name,
      email,
      phone,
      password,
      instructorOrClient,
    } = values;

    const newValues = {
      username,
      password,
      first_name,
      last_name,
      email,
      phone,
    };

    if (instructorOrClient === "instructor") {
      dispatch({ type: "CREATING_NEW_PROFILE" });
      axiosWithAuth()
        .post("/api/auth/instructors/register", newValues)
        .then((res) => {
          reset(initialValues);
          history.push("/login");
        })
        .catch((err) => {
          console.log(err.response.data.errorMessage);
          dispatch({
            type: "SOMETHING_WENT_WRONG",
            payload: err.response.data.errorMessage,
          });
        });
    } else {
      dispatch({ type: "CREATING_NEW_PROFILE" });
      axiosWithAuth()
        .post("/api/auth/clients/register", newValues)
        .then((res) => {
          reset(initialValues);
          history.push("/login");
        })
        .catch((err) => {
          console.log(err.response.data.errorMessage);
          dispatch({
            type: "SOMETHING_WENT_WRONG",
            payload: err.response.data.errorMessage,
          });
        });
    }
  };

  return (
    <div className="Login">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            ref={register({ required: true })}
          />
          {errors.username && errors.username.type === "required" && (
            <p className="Login-error">Required field</p>
          )}
          {error.includes("Username") && <p className="Login-error">{error}</p>}
        </label>
        <label htmlFor="first_name">
          <input
            type="text"
            name="first_name"
            id="first_name"
            placeholder="first name"
            ref={register({ required: true })}
          />
          {errors.first_name && <p className="Login-error">Required field</p>}
        </label>
        <label htmlFor="last_name">
          <input
            type="text"
            name="last_name"
            id="last_name"
            placeholder="last name"
            ref={register({ required: true })}
          />
          {errors.last_name && <p className="Login-error">Required field</p>}
        </label>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            ref={register({ required: true })}
          />
          {errors.email && <p className="Login-error">Required field</p>}
          {error.includes("email") && <p className="Login-error">{error}</p>}
        </label>

        <label htmlFor="phone">
          <input
            type="number"
            name="phone"
            id="phone"
            placeholder="phone number"
            ref={register({ required: true, minLength: 10, maxLength: 10 })}
          />
          {errors.phone && errors.phone.type === "required" && (
            <p className="Login-error">Required field</p>
          )}
          {errors.phone && errors.phone.type === "minLength" && (
            <p className="Login-error">Invalid Phone Number</p>
          )}
          {errors.phone && errors.phone.type === "maxLength" && (
            <p className="Login-error">Invalid Phone Number</p>
          )}
        </label>

        <label htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            ref={register({ required: true })}
          />
          {errors.password && <p className="Login-error">Required field</p>}
        </label>

        <label htmlFor="select" className="select">
          <select
            name="instructorOrClient"
            id="select"
            ref={register({ required: true })}
          >
            <option value="">Sign up as</option>
            <option value="instructor">Instructor</option>
            <option value="client">Client</option>
          </select>
          {errors.instructorOrClient && (
            <p className="Login-error">Required field</p>
          )}
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Summiting..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
