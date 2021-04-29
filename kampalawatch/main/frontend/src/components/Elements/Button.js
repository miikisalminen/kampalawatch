// This is a component used for all the buttons

import styled from "styled-components";

export default styled.button`
  background-color: ${(props) => (props.primary ? "#4caf50" : "#fff")};
  border: 1px solid black;
  color: black;
  font-size: 16px;
  min-width: 250px;
  transition: 0.7s;

  padding: 5px;

  &:hover {
    filter: brightness(0.8);
  }
`;
