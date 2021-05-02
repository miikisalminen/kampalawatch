import React, { Component } from "react";
import axios from "axios";

import BoxContainer from "../Containers/BoxContainer";
import CardContainer from "../Containers/CardContainer";
import Header from "../Elements/Header";
import Button from "../Elements/Button";
import { Modal } from "react-bootstrap";

import Input from "../Elements/Input";
import Youtube from "react-youtube";

import "../bootstrap-override.css";

export default class FriendRoomCard extends Component {
  state = {
    show: false,
    setShow: false,
    video: "",
    videoIdInput: "",
    title: "N/A",
    delete: false,
  };

  setTitle = (e) => {
    this.setState({
      title: e.target.getVideoData().title,
    });
  };

  join = () => {
    this.setState({ show: true, video: this.props.currentVideo });
  };
  leave = () => {
    this.setState({ show: false });
  };

  render() {
    const opts = {
      height: "480",
      width: "852",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
    // HOW I PLAN ON DOING THESE ROOM SHIT
    /*
      1. Have an interval run about every second
        a. check time elapsed, updating django model when needed
        b. if the time elapsed is the same as last time, dont update = no change
      2. In the future when implementing 'Friend' Roomcards, restrict video playing
          from guests and have an interval running checking for the current time
        a. If the latency between friend and creator is > ~3s synchronize with seekTo()
    */
    return (
      <CardContainer>
        <Header>
          {this.props.name} made by {this.props.creator}
        </Header>
        <Button primary onClick={this.join}>
          Join
        </Button>
        <Button>Invite</Button>

        <Modal show={this.state.show} dialogClassName="modal-80vh">
          <Modal.Header>
            <Modal.Title>{this.props.name}</Modal.Title>
            <Header>{this.state.title}</Header>
          </Modal.Header>
          <div style={{ display: "table", margin: "auto" }}>
            <Youtube
              name="player"
              videoId={this.state.video}
              opts={opts}
              onStateChange={this.setTitle}
            />
            <Button onClick={this.leave} style={{ float: "right" }}>
              Close
            </Button>
          </div>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </CardContainer>
    );
  }
}
