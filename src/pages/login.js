import React from "react";
import { Link, Redirect } from "react-router-dom";

import { authStates, withAuth } from "../components/auth";
import en from "../utils/i18n";
import Loader from "../components/loader";
import { signIn } from "../utils/firebase";
import { validateEmailPassword } from "../utils/helpers";

import "../styles/login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      retype: "",
      error: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      error: "",
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.error) {
      return;
    }

    //Validate email & password
    const errorMsg = validateEmailPassword(
      this.state.email,
      this.state.password
    );

    if (errorMsg) {
      this.setState({
        error: errorMsg,
      });
      return;
    }

    signIn(this.state.email, this.state.password)
      .then(() => {
        console.log("Signed In");
      })
      .catch(e => {
        console.log("Error signing in", e);
        this.setState({
          error: "Incorrect email/password",
        });
      });
  }
  render() {
    if (this.props.authState === authStates.INITIAL_VALUE) {
      return <Loader />;
    }

    if (this.props.authState === authStates.LOGGED_IN) {
      return <Redirect to="/"></Redirect>;
    }

    const errorMsg = this.state.error;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="container">
          <h2>{en.GREETINGS.LOGIN}</h2>

          <input
            type="text"
            placeholder={en.FORM_FIELDS.EMAIL}
            name="email"
            onChange={this.handleInputChange}
            required
          />

          <input
            type="password"
            placeholder={en.FORM_FIELDS.PASSWORD}
            name="password"
            onChange={this.handleInputChange}
            required
          />
          {errorMsg && <p className="error">{errorMsg}</p>}
          <button id="login-button" type="submit">
            Login
          </button>

          <p>{en.FORM_FIELDS.LOGIN_ALT_TEXT}</p>
          <Link to="/signup">Sign up</Link>
        </div>
      </form>
    );
  }
}

export default withAuth(Login);
