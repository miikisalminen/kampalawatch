import React from "react";
import axios from "axios";

import Header from "../Elements/Header";

import Button from "../Elements/Button";
import Navbar from "./Navbar";
import ColumnContainer from "../Containers/ColumnContainer";

import CardContainer from "../Containers/CardContainer";
import RoomCard from "./RoomCard";
import FriendRoomCard from "./FriendRoomCard";
import NotifCard from "./NotifCard";
import RoomCreation from "./RoomCreation";

class DashBoard extends React.Component {
  state = {
    animate: false,
    rooms: [],
    friendrooms: [],
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
      .get("http://127.0.0.1:8000/api/rooms", config)
      .then((res) => {
        let result = eval(res.data);
        this.setState({ rooms: result });
      })
      .catch((err) => {});

    axios
      .get("http://127.0.0.1:8000/api/get_friendrooms", config)
      .then((res) => {
        console.log("result:" + res);
        let result = eval(res.data);
        this.setState({ friendrooms: result });
      })
      .catch((err) => {});

    // Get all friendrequests
    axios
      .get("http://127.0.0.1:8000/api/get_notifications", config)
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
            <RoomCard name={room.name} currentVideo={room.current_video} />
          ))}

          <Header>Friend Rooms</Header>
          {this.state.friendrooms.map((f_room) => (
            <FriendRoomCard
              name={f_room.name}
              id={f_room.id}
              creator={f_room.creator}
            />
          ))}
        </ColumnContainer>

        <ColumnContainer style={{ width: "50%" }}>
          <Header>Feed</Header>
        </ColumnContainer>

        <ColumnContainer style={{ width: "25%" }}>
          <Header>Notifications</Header>
          {this.state.notifs.map((notif) => (
            <NotifCard
              name={notif.requesting_user}
              typeOf={notif.type_of}
              room={notif.room}
            />
          ))}
        </ColumnContainer>
      </div>
    );
  }
}
export default DashBoard;
