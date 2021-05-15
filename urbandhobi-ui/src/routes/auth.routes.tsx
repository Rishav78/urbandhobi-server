import { Route } from "react-router-dom";
import { SignUp, SignIn } from "../screens/authentication";

export const AuthRoutes = () => {
  return (
    <>
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
    </>
  );
};
