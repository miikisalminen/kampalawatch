import React from "react";
import axios from "axios";

import Button from "../Elements/Button";
import Input from "../Elements/Input";

class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/token/", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        window.location.reload(false);
        localStorage.clear();

        localStorage.setItem("accessToken", res.data.access);
        localStorage.setItem("refreshToken", res.data.refresh);
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

          <Button primary type="submit">
            Log in
          </Button>
        </form>
      </div>
    );
  }
}
export default LoginForm;
