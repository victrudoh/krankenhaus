import styled from "styled-components";

export const Wrapper = styled.div`
  /* width: 60%; */
  background-color: white;
  box-shadow: var(--box-shadow);
  padding: 1rem;
  border-radius: var(--border-radius);
  /* height: 100vh; */
  overflow-y: auto;

  @media (max-width: 1024px) {
    width: 95%;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
  }
`;

export const Content = styled.div`
  @media (max-width: 768px) {
  }
`;
