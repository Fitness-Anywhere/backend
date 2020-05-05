// REACT I only
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialValues = {
  username: "",
  password: "",
  instructorOrClient: "",
};

function Login() {
  const history = useHistory();
  const { register, errors, handleSubmit, reset } = useForm({ initialValues });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.credentialReducer);

  // POST / api / auth / instructors / login
  // POST / api / auth / clients / login

  // omar12 omar12 instructor
  // omarr omarrr client
  const onSubmit = (values) => {
    console.log("values herer", values);
    const { username, password, instructorOrClient } = values;
    const newValues = { username, password };
    if (instructorOrClient === "instructor") {
      dispatch({ type: "LOGGING_IN_USER" });
      axiosWithAuth()
        .post("/api/auth/instructors/login", newValues)
        .then((res) => {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          localStorage.setItem("id", JSON.stringify(res.data.id));
          history.push(`/account/instructor/${res.data.id}`);
          dispatch({ type: "USER_LOGGED_IN_SUCCESSFULLY" });
          reset(initialValues);
        })
        .catch((err) => {
          console.log(err.response.data.errorMessage);
          dispatch({
            type: "ERROR_LOGING_IN",
            payload: err.response.data.errorMessage,
          });
        });
    } else {
      dispatch({ type: "LOGGING_IN_USER" });

      axiosWithAuth()
        .post("/api/auth/clients/login", newValues)
        .then((res) => {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          localStorage.setItem("id", JSON.stringify(res.data.id));
          history.push(`/account/client/${res.data.id}`);
          dispatch({ type: "USER_LOGGED_IN_SUCCESSFULLY" });

          reset(initialValues);
        })
        .catch((err) => {
          console.log(err.response.data.errorMessage);
          dispatch({
            type: "ERROR_LOGING_IN",
            payload: err.response.data.errorMessage,
          });
        });
    }
  };

  const testing = () => {
    console.log("clicking...");
  };
  return (
    <div className="Login">
      <h1>Log in</h1>
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
          {error.includes("Invalid") && <p className="Login-error">{error}</p>}
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            ref={register({ required: true })}
          />
          {errors.username && errors.username.type === "required" && (
            <p className="Login-error">Required field</p>
          )}
          {error.includes("Invalid") && <p className="Login-error">{error}</p>}
        </label>

        <label htmlFor="select" className="select">
          <select
            name="instructorOrClient"
            id="select"
            ref={register({ required: true })}
          >
            <option value="">Login as</option>
            <option value="instructor">Instructor</option>
            <option value="client">Client</option>
          </select>
          {errors.instructorOrClient && (
            <p className="Login-error">Required field</p>
          )}
        </label>

        <button
          onClick={testing}
          type="submit"
          disabled={loading}
          className={loading ? "submitting" : ""}
        >
          {loading ? "Submitting..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
