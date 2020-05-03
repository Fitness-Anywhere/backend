/// react II only
import { initialValues } from "./initialValues";

export const userReducer = (state = initialValues, action) => {
  switch (action.type) {
    case "SAVE_INSTRUCTOR_ID":
      return {
        ...state,
        instructorID: action.payload,
      };
    ///// ===>
    case "FETCHING_ADDING_CLASSES":
      return {
        ...state,
        loading: true,
      };
    case "ADDED_CLASS_SUCCESSFULLY":
      return {
        ...state,
        loading: false,
        addClassSuccessfull: true,
      };
    case "ERROR_ADDING_CLASS":
      return {
        ...state,
        loading: false,
      };

    case "HIDE_ADD_SUCCESSFULL_MESSAGE":
      return {
        ...state,
        addClassSuccessfull: false,
      };

    //////// <========

    // FROM instructorHomePage.js
    case "FETCHING_INSTRUCTOR_CLASSES":
      return {
        ...state,
        loading: true,
      };
    case "GETTING_INSTRUCTOR_CLASSES":
      return {
        ...state,
        loading: false,
        instructorClass: action.payload,
      };
    case "ERROR_GETTING_CLASSES":
      return {
        ...state,
        loading: false,
      };
    // end here

    // REMOVING CLASS
    case "REMOVING_CLASS":
      return {
        ...state,
        loading: true,
      };
    case "REMOVED_CLASS":
      return {
        ...state,
        loading: false,
      };
    case "ERROR_REMOVING_CLASS":
      return {
        ...state,
        loading: false,
      };

    // saving instructor info
    case "FETCHING_INSTRUCTOR":
      return {
        ...state,
        loading: true,
      };
    case "SAVE_INSTRUCTOR_NAME":
      return {
        ...state,
        instructorName: action.payload,
        loading: false,
      };
    case "ERROR_GETTING_INSTRUCTOR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
