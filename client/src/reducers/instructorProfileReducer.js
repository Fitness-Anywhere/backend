import { initialValues } from "./initialValues";

export const instructorProfileReducer = (state = initialValues, action) => {
  switch (action.type) {
    case "UPDATING_INSTRUCTOR_IMG":
      return {
        ...state,
        loading: true,
      };
    case "SAVING_INSTRUCTOR_IMG":
      return {
        ...state,
        loading: false,
        instructorUpdatedProfile: action.payload,
      };
    case "SAVING_INSTRUCTOR_IMG_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //////
    case "GETTING_INSTRUCTOR_UPDATED_INFO":
      return {
        ...state,
        loading: true,
      };
    case "SAVING_INSTRUCTOR_UPDATED_INFO":
      return {
        ...state,
        loading: false,
        instructorUpdatedProfile: action.payload,
      };
    case "SAVING_INSTRUCTOR_UPDATED_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
