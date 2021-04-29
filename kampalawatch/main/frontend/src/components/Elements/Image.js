import styled from "styled-components";

export default styled.img`
  margin-top: 50px;
  border-radius: 50%;

  &:hover {
    animation: rotation 0.5s infinite linear;

    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(359deg);
      }
    }
  }
`;
