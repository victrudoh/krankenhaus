import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 1rem;
  /* margin-left: 1rem; */
  display: flex;
  justify-content: space-evenly;
  gap: 1rem;
  /* background-color: red; */
  width: 100%;

  @media (max-width: 1024px) {
    width: 95%;
    flex-direction: column-reverse;
    gap: 1rem;
  }
`;

export const Top = styled.div`
  /* background-color: red; */
  width: 60%;
  margin-top: 1rem;
  margin-left: 2.3rem;
  display: flex;
  justify-content: end;

  a {
    background-color: white;
    box-shadow: var(--box-shadow);
    padding: 0.3rem 1rem;
    border-radius: var(--border-radius);
    text-decoration: none;
    color: var(--accent-color);
    font-weight: 500;

    &:hover {
      background-color: var(--secondary-color);
    }
  }

  .pair {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1rem;
    /* background-color: green; */
    /* width: 60%; */

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
