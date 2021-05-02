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

export default class RoomCard extends Component {
  state = {
    show: false,
    setShow: false,
    video: "",
    videoIdInput: "",
    title: "N/A",
    delete: false,
  };

  afterSubmission(e) {
    e.preventDefault();

    let data = JSON.stringify({
      current_video: this.state.videoIdInput,
      current_time: 0,
      name: this.props.name,
    });
    console.log(data);
    axios
      .post("http://localhost:8000/api/update_room", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {})
      .catch((err) => {});

    this.setState({
      video: this.state.videoIdInput,
    });
  }

  handleInput = (e) => {
    try {
      var videoId = e.target.value.split("v=")[1].split("&")[0];
    } catch (err) {
      console.log(err);
    }

    this.setState({
      videoIdInput: videoId,
    });
  };

  setTitle = (e) => {
    this.setState({
      title: e.target.getVideoData().title,
    });
  };

  beginPlay = (e) => {
    var intervalId = setInterval(function () {
      let data = JSON.stringify({
        current_time: Math.floor(e.target.getCurrentTime()),
        name: "monke video",
      });
      console.log(data);
      axios
        .post("http://localhost:8000/api/update_room_time", data, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
        })
        .then((res) => {})
        .catch((err) => {});

      //console.log(e.target.getCurrentTime());
    }, 1000);

    this.setState({ intervalId: intervalId });
  };

  pausePlay = (e) => {
    console.log("paused");
    clearInterval(this.state.intervalId);
  };

  updateTime(e) {
    console.log("test");
  }

  join = () => {
    this.setState({ show: true, video: this.props.currentVideo });
  };
  leave = () => {
    this.setState({ show: false });
    clearInterval(this.state.intervalId);
  };

  render() {
    const opts = {
      height: "480",
      width: "852",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
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
        <Header>{this.props.name}</Header>
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
              onPlay={this.beginPlay}
              onPause={this.pausePlay}
            />

            <form onSubmit={(e) => this.afterSubmission(e)}>
              <Input
                type="text"
                placeholder="YouTube URL"
                name="video"
                onChange={this.handleInput}
              />
              <Button primary type="submit" style={{ float: "left" }}>
                Play
              </Button>
            </form>
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
