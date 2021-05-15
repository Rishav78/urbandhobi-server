import { AuthRoutes } from "./authentication/auth.routes";
import { BrowserRouter as Router } from "react-router-dom";
import { HomeRoutes } from "./authentication/home.routes";
import { useAuth } from "@urbandhobi/hooks";

export const Routes = () => {
  const { authenticated } = useAuth();
  return <Router>{!authenticated ? <AuthRoutes /> : <HomeRoutes />}</Router>;
};
