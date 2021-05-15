import { useCallback, useState, ChangeEvent } from "react";
import { InputAdornment, TextField, Checkbox, Button } from "@material-ui/core";
import signinLogo from "@urbandhobi/assets/images/signin.jpg";
import { Email, Lock } from "@material-ui/icons";
import "./index.css";
import "../index.css";
import { submitButton } from "./style";
import { Link } from "react-router-dom";
import { emailRegex, passwordRegex } from "@urbandhobi/lib/helpers";
import { useAuth } from "@urbandhobi/hooks";
import { useHistory } from "react-router-dom";

export const SignIn = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const history = useHistory();

  const { signin } = useAuth();

  const isValidEmail = email === null ? null : emailRegex.test(email);
  const isValidPassword =
    password === null ? null : passwordRegex.test(password);

  const onEmailChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    []
  );

  const onPasswordChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    []
  );

  const onSubmit = useCallback(() => {
    if (!isValidPassword || !isValidEmail) {
      return alert("provide required ");
    }
    console.log(email, password);
    signin();
    history.replace("/");
  }, [email, password, isValidPassword, isValidEmail, signin, history]);

  return (
    <div className="screen-container authentication-block">
      <div className="authentication-action">
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img alt="signin" src={signinLogo} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
            color: "#000",
          }}
        >
          <Link to="/signup">
            <span style={{ color: "#333" }}>Create an account</span>
          </Link>
        </div>
      </div>
      <div className="authentication-form">
        <h1 className="authentication-form-heading">Sign in</h1>
        <div className="authentication-form-fields">
          <div className="authentication-form-field">
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              error={!(isValidEmail === null || isValidEmail)}
              value={email}
              onChange={onEmailChange}
              className="field"
              label="Email (required)*"
            />
          </div>
          <div className="authentication-form-field">
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
              type="password"
              error={!(isValidPassword === null || isValidPassword)}
              value={password}
              onChange={onPasswordChange}
              className="field"
              label="Password (required)*"
            />
          </div>
          <div className="authentication-form-field">
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Checkbox style={{ margin: 0, padding: 0 }} color="primary" />
              <span style={{ display: "inline-block", paddingLeft: 10 }}>
                Remember me
              </span>
            </div>
          </div>
          <div className="authentication-form-field">
            <Button
              onClick={onSubmit}
              size="large"
              style={submitButton}
              color="primary"
            >
              <span>Login</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
