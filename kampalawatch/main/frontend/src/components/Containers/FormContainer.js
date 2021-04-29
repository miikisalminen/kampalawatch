import React from "react";
import axios from "axios";
import styled from "styled-components";

import SignUpForm from "../Forms/SignUpForm";
import LoginForm from "../Forms/LoginForm";
import Button from "../Elements/Button";

/*function testing() {
  localStorage.clear();
  window.location.reload(false);
  console.log("Cleared localstorage");
}*/

class FormContainer extends React.Component {
  state = {
    showing: false,
  };

  render() {
    var Handlechange = (e) => {
      this.setState({ showing: !this.state.showing });
    };

    const x = this.state.showing;

    return (
      <div>
        <Button onClick={Handlechange}>
          {x
            ? "Already have an account? Log in!"
            : "Dont have an account? Sign up!"}
        </Button>
        {x ? (
          <div>
            <SignUpForm />
          </div>
        ) : (
          <div>
            <LoginForm />
          </div>
        )}
      </div>
    );
  }
}
export default FormContainer;
