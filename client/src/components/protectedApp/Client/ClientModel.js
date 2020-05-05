import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MainStripe from "../stripe/MainStripe";
import { MdCheckCircle } from "react-icons/md";

export default function ClientModel({ data }) {
  const [open, setOpen] = useState(false);
  const { isProccessing } = useSelector((state) => state.stripeReducer);

  const { image_url, price, name } = data;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //   console.log("varible here ", isProccessing);
  return (
    <div id="ClientModel">
      <div id="add-to-cart-btn">
        <Button onClick={handleClickOpen}>add to cart</Button>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {isProccessing ? (
            <div className="success-payment">
              <div className="success-icon">
                <MdCheckCircle />
              </div>
              <h3>payment was successfully</h3>
            </div>
          ) : (
            <div className="show-payment-info">
              <div className="show-payment-info-options">
                <div>
                  <h2>{name}</h2>
                  <p>{`$${price}`}</p>
                </div>

                <div id="close-btn">
                  <Button onClick={handleClose} autoFocus>
                    close
                  </Button>
                </div>
              </div>
              <div className="show-payment-info-img">
                <img src={image_url} alt={name} />
              </div>
              <MainStripe />
            </div>
          )}
        </DialogContent>
        {isProccessing && (
          <DialogActions>
            <div id="close-success-payment">
              <Button onClick={handleClose} autoFocus>
                close
              </Button>
            </div>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}
