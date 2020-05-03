import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MainStripe from "../stripe/MainStripe";

export default function ClientModel({ data }) {
  const [open, setOpen] = useState(false);

  const { image_url, price, name } = data;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        add to cart
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Add payment method"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/*  Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running. */}
            <div className="show-payment-info">
              <div className="show-payment-info-img">
                <span>{`$${price}`}</span>
                <img src={image_url} alt={name} />
              </div>
              <MainStripe />
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
