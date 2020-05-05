import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Login from "../components/Login";
import Signup from "../components/SignUp";

export default function AlertDialog({ option }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div id="model-links">
      <div id="model-links-btn">
        <Button onClick={handleClickOpen}>
          {option === "login" ? "login" : "Sign Up"}
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <div className="home-modal-container">
            <div id="close-credential-modal">
              <Button onClick={handleClose} autoFocus>
                close
              </Button>
            </div>
            <div className="display-component">
              {option === "login" ? <Login /> : <Signup />}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
