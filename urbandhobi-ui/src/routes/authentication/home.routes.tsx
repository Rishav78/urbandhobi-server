import { Route, Switch } from "react-router-dom";
import "./index.css";
import { Home } from "@urbandhobi/screens/home";

export const HomeRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  );
};
