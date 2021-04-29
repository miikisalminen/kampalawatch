import React from "react";

import Header from "../Elements/Header";
import Paragraph from "../Elements/Paragraph";
import Image from "../Elements/Image";

import BoxContainer from "../Containers/BoxContainer";
import FormContainer from "../Containers/FormContainer";

class LoginBox extends React.Component {
  state = {
    animate: false,
  };

  componentDidMount() {
    const ANIMATION_TIMEOUT = 50;
    setTimeout(() => {
      this.setState({ animate: true });
    }, ANIMATION_TIMEOUT);
  }
  render() {
    return (
      <BoxContainer
        style={{
          opacity: this.state.animate ? "100%" : "0%",
          transition: "1s",
        }}
      >
        <Header>KampalaWatch</Header>
        <Paragraph>
          KampalaWatch is a silly little project of mine that I'm doing to learn
          fullstack-developement
        </Paragraph>
        <FormContainer />
        <Image
          src={
            "https://i.pinimg.com/originals/47/ae/d5/47aed53d477c33e46865f6e000418bdf.gif"
          }
          style={{ width: "30%" }}
        ></Image>
      </BoxContainer>
    );
  }
}
export default LoginBox;
