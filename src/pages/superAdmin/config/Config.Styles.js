import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 1rem;
  /* margin-left: 1rem; */
  display: flex;
  justify-content: space-evenly;
  gap: 1rem;

  @media (max-width: 1024px) {
    flex-direction: column-reverse;
    gap: 2rem;
    padding-bottom: 2rem;
  }
`;
