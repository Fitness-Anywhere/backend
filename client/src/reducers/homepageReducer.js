import { initialValues } from "./initialValues";

export const homepageReducer = (state = initialValues, action) => {
  switch (action.type) {
    case "FETCHING_HOMEPAGE_CLASSES":
      return {
        ...state,
        loading: true,
      };
    case "SAVING_HOMEPAGE_CLASSES":
      const newArr = action.payload.slice(0, 6);
      return {
        ...state,
        loading: false,
        homepageClasses: newArr,
      };
    case "HOMEPAGE_CLASS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
