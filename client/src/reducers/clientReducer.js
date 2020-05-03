import { initialValues } from "./initialValues";

export const clientReducer = (state = initialValues, action) => {
  switch (action.type) {
    case "SAVE_CLIENT_ID":
      return {
        ...state,
        clientID: action.payload,
      };
    case "FETCHING_CLIENT_CLASSES":
      return {
        ...state,
        loading: true,
      };
    case "SAVING_CLIENT_CLASSES":
      return {
        ...state,
        loading: false,
        allClasses: action.payload,
      };
    case "SAVING_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // filtered classes
    case "ADDING_SEARCH_CLASSES":
      return {
        ...state,
        filterClasses: action.payload,
      };

    // client join class
    case "CLIENT_JOINED_CLASS":
      return {
        ...state,
        joinedClass: !state.joinedClass,
      };

    //  .get(`/api/clients/${id}/classes`)

    case "FETCHING_CLASSES_JOINED":
      return {
        ...state,
        loading: true,
      };
    case "SAVING_JOINED_CLASSES":
      return {
        ...state,
        loading: false,
        classesJoined: action.payload,
      };
    case "ERROR_SAVING_JOINED_CLASSES":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // FETCHING RERENDER CLASSES
    case "FETCHING_RERENDER_CLASSES":
      return {
        ...state,
        loading: true,
      };
    case "RERENDERING_JOINED_CLASSES":
      return {
        ...state,
        loading: false,
        classesJoined: action.payload,
      };
    case "ERROR_RERENDERING_JOINED_CLASSES":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
