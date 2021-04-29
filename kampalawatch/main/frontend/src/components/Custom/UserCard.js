import React, { Component } from "react";
import Button from "../Elements/Button";
import CardContainer from "../Containers/CardContainer";
import Header from "../Elements/Header";
import axios from "axios";

export default class UserCard extends Component {
  state = {
    name: this.props.name,
    disabled: false,
    buttonText: "Send request",
  };

  sendRequest = () => {
    this.setState({ disabled: true, buttonText: "Sent" });
    let data = JSON.stringify({
      receiving_username: this.state.name,
    });
    console.log(data);
    axios
      .post("http://localhost:8000/api/create_friendrequest", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {})
      .catch((err) => {});
  };

  render() {
    return (
      <CardContainer>
        <Header>{this.props.name}</Header>
        <Button disabled={this.state.disabled} onClick={this.sendRequest}>
          {this.state.buttonText}
        </Button>
      </CardContainer>
    );
  }
}
