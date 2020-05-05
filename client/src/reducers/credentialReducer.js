import { initialValues } from "./initialValues";

export const credentialReducer = (state = initialValues, action) => {
  switch (action.type) {
    case "CREATING_NEW_PROFILE":
      return {
        ...state,
        loading: true,
      };
    case "SOMETHING_WENT_WRONG":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // log in
    case "LOGGING_IN_USER":
      return {
        ...state,
        loading: true,
      };
    case "USER_LOGGED_IN_SUCCESSFULLY":
      return {
        ...state,
        loading: false,
      };
    case "ERROR_LOGING_IN":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
