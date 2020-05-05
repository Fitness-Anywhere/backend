import { initialValues } from "./initialValues";

export const stripeReducer = (state = initialValues, action) => {
  switch (action.type) {
    //  case "PROCCESSING_PAYMENT":
    //    return {
    //      ...state,
    //      isProccessing: true,
    //    };
    case "PROCCESSING_PAYMENT":
      return {
        ...state,
        isProccessing: false,
      };
    case "PAYMENT_PROCCESSED":
      return {
        ...state,
        isProccessing: true,
      };
    default:
      return state;
  }
};
