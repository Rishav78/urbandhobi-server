import { Route, Switch } from "react-router-dom";
import { Home } from "@urbandhobi/screens/home";
import { UDDrawer } from "@urbandhobi/components";

export const HomeRoutes = () => {
  return (
    <>
      <UDDrawer />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
};
