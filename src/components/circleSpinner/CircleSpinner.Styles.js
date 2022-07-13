import styled from "styled-components";

export const CircleSpinner = styled.div`
  /* border: 5px solid var(--accentColor); */
  border-top: 5px solid var(--accent-color);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 0.8s linear infinite;
  margin: 20px auto;
  z-index: 100;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
