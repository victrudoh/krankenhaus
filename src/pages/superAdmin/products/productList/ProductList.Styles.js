import styled from "styled-components";

export const Wrapper = styled.div`
  width: 60%;
  background-color: white;
  box-shadow: var(--box-shadow);
  padding: 1rem;
  border-radius: var(--border-radius);
  /* height: 100vh; */
  overflow-y: auto;

  tr {
    cursor: pointer;
  }

  button {
    background-color: var(--accent-color);
    box-shadow: var(--box-shadow);
    padding: 0.3rem 1rem;
    border-radius: var(--border-radius);
    text-decoration: none;
    color: var(--text-white);
    font-weight: 500;

    &:hover {
      background-color: var(--secondary-color);
      color: var(--accent-color);
    }

    @media (max-width: 768px) {
      padding: 0.3rem;
      font-weight: 300;
    }
  }

  @media (max-width: 1024px) {
    width: 95%;
    margin: 0 auto;
  }
`;

export const Top = styled.div`
  /* background-color: red; */
  width: 100%;
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;

  button {
    background-color: var(--accent-color);
    box-shadow: var(--box-shadow);
    padding: 0.3rem 1rem;
    border-radius: var(--border-radius);
    text-decoration: none;
    color: var(--text-white);
    font-weight: 500;

    &:hover {
      background-color: var(--secondary-color);
      color: var(--accent-color);
    }

    @media (max-width: 768px) {
      padding: 0.3rem;
      font-weight: 300;
    }
  }

  .pair {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1rem;
    /* background-color: green; */
    /* width: 60%; */

    label {
      font-size: 12px;
    }

    select {
      padding: 0.5rem;
      border-radius: var(--border-radius);
      /* width: 100%; */

      &:focus {
        border-radius: 10px 10px 0 0;
      }
    }

    button {
      padding: 0.5rem 1rem;
      border-radius: var(--border-radius);
      background-color: var(--accent-color);
      color: var(--text-white);
      margin: 0 0.5rem;

      &:hover {
        color: var(--accent-color);
        background-color: var(--secondary-color);
      }
    }
  }

  @media (max-width: 1024px) {
  }
`;
