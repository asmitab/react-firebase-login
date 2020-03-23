import React from "react";
import { Link, Redirect } from "react-router-dom";

import { authStates, withAuth } from "../components/auth";
import { createNewUser } from "../service/firebase";
import Loader from "../components/loader";

import "../styles/login.css";

class SignUp extends React.Component {
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
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      error: "",
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log("Event: ", event);
    //Validate email & password
    if (!this.state.email) {
      this.setState({
        error: "Email is required",
      });
      return;
    }
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(this.state.email)) {
      this.setState({
        error: "Invalid email",
      });
      return;
    }
    if (!this.state.password) {
      this.setState({
        error: "Password is required",
      });
      return;
    }

    this.signUpInProgess = true;
    createNewUser(this.state.email, this.state.password)
      .then(() => {
        console.log("Signed Up!");
        this.signUpInProgess = false;
      })
      .catch(e => {
        console.log("Error signing up", e);
        if (e.code === "auth/email-already-in-use") {
          this.setState({
            error: "Email already in use",
          });
        }
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
          <input
            type="text"
            placeholder="Display Name"
            name="displayname"
            onChange={this.handleInputChange}
            required
          />

          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={this.handleInputChange}
            required
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={this.handleInputChange}
            required
          />

          {errorMsg && <p className="error">Error: {errorMsg}</p>}
          <button type="submit">Signup</button>

          <p>Already a member?</p>
          <Link to="/login">Login</Link>
        </div>
      </form>
    );
  }
}

export default withAuth(SignUp);
