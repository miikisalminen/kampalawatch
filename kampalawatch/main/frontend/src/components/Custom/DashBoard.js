import React from "react";
import axios from "axios";

import Header from "../Elements/Header";

import Button from "../Elements/Button";
import Navbar from "./Navbar";
import ColumnContainer from "../Containers/ColumnContainer";

import CardContainer from "../Containers/CardContainer";
import RoomCard from "./RoomCard";
import NotifCard from "./NotifCard";
import RoomCreation from "./RoomCreation";

//const handleClose = () => setShow(false);
//const handleShow = () => setShow(true);

class DashBoard extends React.Component {
  state = {
    animate: false,
    rooms: [],
    notifs: [],
  };

  componentDidMount() {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    };

    const ANIMATION_TIMEOUT = 50;
    setTimeout(() => {
      this.setState({ animate: true });
    }, ANIMATION_TIMEOUT);
    // Get all rooms
    axios
      .get("http://localhost:8000/api/rooms", config)
      .then((res) => {
        let result = eval(res.data);
        this.setState({ rooms: result });
      })
      .catch((err) => {});
    // Get all friendrequests
    axios
      .get("http://localhost:8000/api/get_friendrequests", config)
      .then((res) => {
        let result = eval(res.data);
        this.setState({ notifs: result });
      })
      .catch((err) => {});
  }
  render() {
    return (
      <div
        style={{
          opacity: this.state.animate ? "100%" : "0%",
          transition: "1s",
        }}
      >
        <Navbar />
        <ColumnContainer style={{ width: "25%" }}>
          <Header>My Rooms </Header>
          <RoomCreation />
          {this.state.rooms.map((room) => (
            <RoomCard name={room.name} id={room.id} />
          ))}

          <Header>Friend Rooms</Header>
        </ColumnContainer>
        <ColumnContainer style={{ width: "50%" }}>
          <Header>Feed</Header>
        </ColumnContainer>
        <ColumnContainer style={{ width: "25%" }}>
          <Header>Notifications</Header>
          {this.state.notifs.map((notif) => (
            <NotifCard name={notif.requesting_user} />
          ))}
        </ColumnContainer>
      </div>
    );
  }
}
export default DashBoard;
