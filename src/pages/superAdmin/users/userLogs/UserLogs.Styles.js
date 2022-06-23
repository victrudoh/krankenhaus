import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-evenly;
  gap: 1rem;

  @media (max-width: 1024px) {
    flex-direction: column-reverse;
    margin-left: 1.3rem;
    gap: 1rem;
    padding-bottom: 2rem;
  }

  @media (max-width: 768px) {
  }
`;
