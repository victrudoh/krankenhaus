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

  button {
    padding: 0.2rem 0.5rem;
    border-radius: var(--border-radius);
    background-color: var(--accent-color);
    color: var(--text-white);
    /* margin: 1rem 0.5rem; */

    &:hover {
      color: var(--accent-color);
      background-color: var(--secondary-color);
    }
  }

  tr {
    cursor: pointer;
  }

  @media (max-width: 1024px) {
    width: 96%;
    margin: 0 auto;
  }
`;

export const Top = styled.div`
  /* background-color: red; */
  width: 95%;
  margin: 1.5rem 0;
  display: flex;
  justify-content: space-between;

  .pair {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1rem;
    /* background-color: green; */
    /* font-size: 23px; */
    /* width: 60%; */

    h4 {
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
    }

    select {
      /* width: 100%; */
      padding: 0.2rem 0.5rem;
      border-radius: var(--border-radius);
      /* margin: 1rem 0.5rem; */

      &:focus {
        border-radius: 10px 10px 0 0;
      }
    }
  }

  @media (max-width: 1024px) {
  }
`;
