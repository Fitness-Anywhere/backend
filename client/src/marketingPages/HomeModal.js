import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Login from "../components/Login";
import Signup from "../components/SignUp";

export default function AlertDialog({ option }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const { createdAccountSuccessfully } = useSelector(
    (state) => state.credentialReducer
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch({ type: "RESET_BACK_TO_DEFAULT" });

    setOpen(false);
    setToggle(false);
  };

  const toggleForm = (e) => {
    setToggle(!toggle);
  };

  return (
    <div id="model-links">
      <div id="model-links-btn">
        <button onClick={handleClickOpen}>
          {option === "login" ? "login" : "Sign Up"}
        </button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div id="close-credential-modal">
          <Button onClick={handleClose}>x</Button>
        </div>
        <DialogContent>
          <div id="home-modal-container">
            <div className="display-component">
              {createdAccountSuccessfully ? (
                <Login />
              ) : (
                <div>
                  {toggle || option === "signup" ? <Signup /> : <Login />}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
        {/** 
         this toggles the login/signup form,
      */}
        {!toggle && option !== "signup" ? (
          <div className="option-btn">
            <span>
              Don't have an account?{" "}
              <button onClick={toggleForm}>Sign up</button>
            </span>
          </div>
        ) : (
          <div className="option-btn">
            <span>
              Already a member? <button onClick={toggleForm}>Log in</button>
            </span>
          </div>
        )}
      </Dialog>
    </div>
  );
}
