import React from "react";
import axios from "axios";

import Button from "../Elements/Button";
import Input from "../Elements/Input";

class SignUpForm extends React.Component {
  state = {
    details: [],
    username: "",
    password: "",
    email: "",
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/auth", {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
      })
      .then((res) => {
        localStorage.setItem("token", res.token);
        this.setState({
          username: "",
          password: "",
        });
      })
      .catch((err) => {});
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={this.state.user}
            name="username"
            onChange={this.handleInput}
          />

          <Input
            type="password"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon1"
            value={this.state.quote}
            name="password"
            onChange={this.handleInput}
          />

          <Input
            type="text"
            placeholder="Email"
            aria-label="Email"
            aria-describedby="basic-addon1"
            value={this.state.quote}
            name="email"
            onChange={this.handleInput}
          />

          <Button
            primary
            type="submit"
            onClick={() => window.location.reload(false)}
          >
            Create an Account
          </Button>
        </form>
      </div>
    );
  }
}
export default SignUpForm;
