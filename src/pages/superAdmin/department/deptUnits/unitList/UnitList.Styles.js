import styled from "styled-components";

export const Wrapper = styled.div`
  width: 60%;
  background-color: white;
  box-shadow: var(--box-shadow);
  padding: 1rem;
  border-radius: var(--border-radius);
  /* height: 100vh; */
  overflow-y: auto;

  table {
    width: 100%;
  }

  i {
    cursor: pointer;
    font-size: 18px;

    &:hover {
      font-size: 20px;
      color: var(--secondary-color);
    }
  }

  button {
    padding: 0.2rem 0.5rem;
    border-radius: var(--border-radius);
    background-color: var(--accent-color);
    color: var(--text-white);

    &:hover {
      color: var(--accent-color);
      background-color: var(--secondary-color);
    }
  }

  @media (max-width: 1024px) {
    width: 95%;
    margin: 0 auto;
  }
`;

export const Content = styled.div`
  @media (max-width: 768px) {
  }
`;
