import { combineReducers } from "redux";

import { AuthReducer } from "./authentication/auth.reducer";
import { WidgetsReducer } from "./widgets/widgets.reducer";

const RootReducer = combineReducers({
  auth: AuthReducer,
  widgets: WidgetsReducer,
});

export default RootReducer;
