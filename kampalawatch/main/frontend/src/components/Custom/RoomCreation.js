import React, { Component } from "react";
import axios from "axios";

import Button from "../Elements/Button";
import Input from "../Elements/Input";
import { Modal } from "react-bootstrap";

import "../bootstrap-override.css";

export default class RoomCreation extends Component {
  state = {
    showing: false,
    name: "",
  };

  showModal = () => {
    this.setState({ show: !this.state.show });
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let data = JSON.stringify({
      name: this.state.name,
    });

    axios
      .post("http://localhost:8000/api/rooms", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        window.location.reload(true);
      })
      .catch((err) => {});
  };

  render() {
    return (
      <div>
        {" "}
        <Button primary style={{ width: "100%" }} onClick={this.showModal}>
          Create Room
        </Button>
        <Modal show={this.state.show} dialogClassName="modal-50vh">
          <Modal.Header>
            <Modal.Title>Create Room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <Input
                style={{ width: "100%" }}
                type="text"
                placeholder="Name"
                name="name"
                onChange={this.handleInput}
              />
              <Button type="submit" primary style={{ width: "100%" }}>
                Create
              </Button>
            </form>
            <Button onClick={this.showModal} style={{ width: "100%" }}>
              Cancel
            </Button>
          </Modal.Body>

          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    );
  }
}
