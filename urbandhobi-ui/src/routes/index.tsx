import { AuthRoutes } from "./auth.routes";
import { BrowserRouter as Router, Switch } from "react-router-dom";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <AuthRoutes />
      </Switch>
    </Router>
  );
};
