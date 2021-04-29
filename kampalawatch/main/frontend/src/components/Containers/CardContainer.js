import styled from "styled-components";

export default styled.div`
  width: auto;
  padding: 10px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  background-color: #fff;
  position: relative;
  overflow: hidden;

  transition: 0.3s;

  &:hover {
    background-color: #f5af00;
  }
`;
