/// react II only
import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { clientReducer } from "./clientReducer";

export const rootReducer = combineReducers({
  userReducer,
  clientReducer,
});
