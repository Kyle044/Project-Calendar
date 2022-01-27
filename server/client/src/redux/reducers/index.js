import isLoggedReducer from "./isLogged";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  isLoggedReducer
});

export default allReducers;
