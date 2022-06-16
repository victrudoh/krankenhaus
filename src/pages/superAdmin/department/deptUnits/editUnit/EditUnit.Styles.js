import styled from "styled-components";

export const Wrapper = styled.div`
  width: 30%;
  background-color: white;
  box-shadow: var(--box-shadow);
  padding: 1rem;
  border-radius: var(--border-radius);
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  margin-bottom: 2rem;
  max-height: 50vh;

  @media (max-width: 1024px) {
    width: 80%;
    margin: 0 auto;
  }
`;

export const Content = styled.div`
  /* background-color: red; */
  width: 95%;

  .pair {
    display: flex;
    flex-direction: column;
    margin: 0.5rem 0;

    label {
      margin: 0.3rem;
      font-weight: 500;
    }

    input {
      width: 100%;
      padding: 0.5rem;
      border-radius: var(--border-radius);
    }

    select {
      width: 100%;
      padding: 0.5rem;
      border-radius: var(--border-radius);

      &:focus {
        border-radius: 10px 10px 0 0;
      }
    }
  }

  button {
    padding: 0.5rem;
    border-radius: var(--border-radius);
    background-color: var(--accent-color);
    color: var(--text-white);
    margin: 1rem 0;

    &:hover {
      color: var(--accent-color);
      background-color: var(--secondary-color);
    }
  }

  @media (max-width: 768px) {
  }
`;
