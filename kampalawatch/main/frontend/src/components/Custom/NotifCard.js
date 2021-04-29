import React, { Component } from "react";
import axios from "axios";

import CardContainer from "../Containers/CardContainer";
import Header from "../Elements/Header";
import Button from "../Elements/Button";

export default class NotifCard extends Component {
  state = {
    show: true,
    animate: false,
  };

  decline = () => {
    this.setState({
      show: false,
    });
  };
  accept = () => {
    const ANIMATION_TIMEOUT = 500;

    this.setState({ animate: true });

    setTimeout(() => {
      this.setState({
        show: false,
      });
    }, ANIMATION_TIMEOUT);

    let data = JSON.stringify({
      requesting_username: this.props.name,
    });

    axios
      .post("http://localhost:8000/api/create_friendship", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {})
      .catch((err) => {});
  };

  render() {
    const x = this.state.show;
    return (
      <div
        style={{
          opacity: this.state.animate ? "0%" : "100%",
          transition: "0.5s",
        }}
      >
        {x ? (
          <CardContainer show={this.state.show}>
            <Header>Friendrequest from {this.props.name}</Header>
            <Button primary onClick={this.accept}>
              Accept
            </Button>
            <Button onClick={this.decline}>Decline</Button>
          </CardContainer>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
