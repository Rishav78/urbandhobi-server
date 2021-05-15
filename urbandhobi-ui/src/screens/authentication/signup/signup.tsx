import { InputAdornment, TextField, Checkbox, Button } from "@material-ui/core";
import signupLogo from "@urbandhobi/assets/images/signup.jpg";
import { Email, Lock } from "@material-ui/icons";
import "./index.css";
import "../index.css";
import { submitButton } from "./style";
import { Link } from "react-router-dom";

export const SignUp = () => {
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
