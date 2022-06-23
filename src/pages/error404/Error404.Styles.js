import styled from "styled-components";

export const Wrapper = styled.div`
  /* background-color: grey; */
  margin-left: 1.3rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  width: 97%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
  }
`;

export const Content = styled.div`
  /* background-color: red; */
  width: 60%;
  margin: 0 auto;
  text-align: center;

  h2 {
    font-weight: 800;
    color: var(--accent-color);
  }

  @media (max-width: 768px) {
  }
`;
