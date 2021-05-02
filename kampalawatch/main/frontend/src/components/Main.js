// --- IMPORTS ---
import React from "react";
import axios from "axios";
import { createGlobalStyle } from "styled-components";

// --- CONTAINER COMPONENTS ----
import MainContainer from "./Containers/MainContainer";

// --- CUSTOM COMPONENTS ---
import LoginBox from "./Custom/LoginBox";
import DashBoard from "./Custom/DashBoard";

// Reset browser applied margin and padding
const GlobalStyle = createGlobalStyle`
*{box-sizing: border-box;
    margin: 0;
    padding: 0;}`;

class Main extends React.Component {
  state = {};
  componentDidMount() {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    };

    axios
      .get("http://localhost:8000/api/auth", config)
      .then((res) => {
        this.setState({ user: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    // If user is logged in
    if (this.state.user) {
      return (
        <div>
          <GlobalStyle />
          <DashBoard />
        </div>
      );
    } else {
      // If user is NOT logged in
      return (
        <MainContainer>
          <GlobalStyle />
          <LoginBox />
        </MainContainer>
      );
    }
  }
}
export default Main;
