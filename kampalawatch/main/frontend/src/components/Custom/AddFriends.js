import React, { Component } from "react";
import axios from "axios";

import Button from "../Elements/Button";
import Input from "../Elements/Input";
import { Modal } from "react-bootstrap";

import "../bootstrap-override.css";
import Header from "../Elements/Header";
import UserCard from "./UserCard";

export default class AddFriends extends Component {
  state = {
    showing: false,
    users: [],
  };

  componentDidMount() {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    };

    axios
      .get("http://127.0.0.1:8000/api/create_friendrequest", config)
      .then((res) => {
        let result = eval(res.data);
        this.setState({ users: result });
      })
      .catch((err) => {});
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div>
        {" "}
        <Button primary onClick={this.showModal}>
          Add Friends
        </Button>
        <Modal show={this.state.show} dialogClassName="modal-50vh">
          <Modal.Header>
            <Modal.Title>Add Friends</Modal.Title>
          </Modal.Header>
          <Modal.Body></Modal.Body>
          {this.state.users.map((user) => (
            <UserCard name={user.username}></UserCard>
          ))}
          <Modal.Footer>
            <Button onClick={this.hideModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
