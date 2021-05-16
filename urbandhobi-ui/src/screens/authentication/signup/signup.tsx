import { InputAdornment, TextField, Button } from "@material-ui/core";
import signupLogo from "@urbandhobi/assets/images/signup.jpg";
import { Email, Lock } from "@material-ui/icons";
import "./index.css";
import "../index.css";
import { submitButton } from "./style";
import { Link } from "react-router-dom";
import { ChangeEvent, useCallback, useState } from "react";
import { emailRegex, passwordRegex } from "@urbandhobi/lib/helpers";

export const SignUp = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<string | null>(null);

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

  const onConfirmChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setConfirm(event.target.value);
    },
    []
  );

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
          <img alt="signin" src={signupLogo} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
            color: "#000",
          }}
        >
          <Link to="/signin">
            <span style={{ color: "#333" }}>Already have an account?</span>
          </Link>
        </div>
      </div>
      <div className="authentication-form">
        <h1 className="authentication-form-heading">Sign up</h1>
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
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
              type="password"
              error={confirm !== null && confirm === ""}
              value={confirm}
              onChange={onConfirmChange}
              className="field"
              label="Confirm Password (required)*"
            />
          </div>
          <div className="authentication-form-field">
            <Button size="large" style={submitButton} color="primary">
              <span>Register</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
