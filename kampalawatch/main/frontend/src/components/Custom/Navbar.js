import React from "react";

import Button from "../Elements/Button";

import { Navbar as BootstrapNavbar } from "react-bootstrap";
import AddFriends from "./AddFriends";
import "bootstrap/dist/css/bootstrap.min.css";

class Navbar extends React.Component {
  render() {
    return (
      <BootstrapNavbar bg="dark" variant="dark">
        <BootstrapNavbar.Brand>KampalaWatch</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle />
        <BootstrapNavbar.Collapse className="justify-content-end">
          <AddFriends />
          <Button
            onClick={function (event) {
              localStorage.clear();
              window.location.reload(true);
            }}
          >
            Log out
          </Button>
        </BootstrapNavbar.Collapse>
      </BootstrapNavbar>
    );
  }
}
export default Navbar;
