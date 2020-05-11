import { initialValues } from "./initialValues";

export const credentialReducer = (state = initialValues, action) => {
  switch (action.type) {
    case "CREATING_NEW_PROFILE":
      return {
        ...state,
        loading: true,
      };
    case "CREATED_ACCOUNT_SUCCESSFULLY":
      return {
        ...state,
        loading: false,
        createdAccountSuccessfully: true,
      };
    case "RESET_BACK_TO_DEFAULT":
      return {
        ...state,
        createdAccountSuccessfully: false,
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
        createdAccountSuccessfully: false,
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
