import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 1rem;
  /* margin-left: 1rem; */
  display: flex;
  justify-content: space-evenly;
  gap: 1rem;

  @media (max-width: 1024px) {
    flex-direction: column-reverse;
    gap: 1rem;
  }
`;

export const Content = styled.div`
  @media (max-width: 1024px) {
  }
`;
