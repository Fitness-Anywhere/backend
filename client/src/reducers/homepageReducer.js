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

    case "FETCHING_INSTRUCTORS":
      return {
        ...state,
        loading: true,
      };
    case "SAVING_ALL_INSTRUCTORS":
      let getInstructor = [];

      // check if instructor has an image
      let checkLength = action.payload.filter(
        (inst) => inst.image_url !== null
      );

      // trim array if its length is greater than 3
      if (checkLength.length > 3) {
        getInstructor = checkLength.slice(0, 3);
      } else {
        getInstructor = checkLength;
      }
      return {
        ...state,
        loading: true,
        instructorsInfo: getInstructor,
      };
    case "SAVING_ALL_INSTRUCTORS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
