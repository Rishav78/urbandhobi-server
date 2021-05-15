import { Route, Switch } from "react-router-dom";
import { SignUp, SignIn } from "@urbandhobi/screens/authentication";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./index.css";

export const AuthRoutes = () => {
  return (
    <div className="authentication-container">
      <div className="authentication-card">
        {/* <Route
          render={({ location }) => {
            return (
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  timeout={300}
                  classNames="fade"
                >
                  <Switch location={location}>
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            );
          }}
        /> */}
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>
    </div>
  );
};
