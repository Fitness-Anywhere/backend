export const initialValues = {
  addClassSuccessfull: false,
  addClassError: false,
  createdAccountSuccessfully: false,
  clientID: 0,
  instructorID: 0,
  instructorName: "",
  loading: false,
  instructorClass: [],
  allClasses: [],
  filterClasses: [],
  error: "",
  joinedClass: false,
  classesJoined: [],
  instructorUpdatedProfile: {},

  // stripe
  isProccessing: false,

  // credential reducer
  createdSuccessfully: "",

  homepageClasses: [],
  instructorsInfo: [],
};

export const credentialValues = {
  loading: false,
  error: "",
};
