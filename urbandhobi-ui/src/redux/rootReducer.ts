import { combineReducers } from "redux";

import { AuthReducer } from "./authentication/auth.reducer";

const RootReducer = combineReducers({
  auth: AuthReducer,
});

export default RootReducer;
