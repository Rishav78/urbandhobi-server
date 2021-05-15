import { AuthRoutes } from "./authentication/auth.routes";
import { BrowserRouter as Router } from "react-router-dom";

export const Routes = () => {
  return (
    <Router>
      <AuthRoutes />
    </Router>
  );
};
