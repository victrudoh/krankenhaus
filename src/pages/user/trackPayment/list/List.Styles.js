import styled from "styled-components";

export const Wrapper = styled.div`
  width: 60%;
  background-color: white;
  box-shadow: var(--box-shadow);
  padding: 1rem;
  border-radius: var(--border-radius);
  /* max-height: 108vh; */
  overflow-y: auto;
  margin-bottom: 2rem;

  tr {
    cursor: pointer;
  }

  @media (max-width: 1024px) {
    width: 96%;
    margin: 0 auto;
  }
`;
