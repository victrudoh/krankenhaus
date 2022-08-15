import styled from "styled-components";

export const Wrapper = styled.div`
  width: 80%;
  background-color: white;
  box-shadow: var(--box-shadow);
  padding: 1rem;
  border-radius: var(--border-radius);
  /* max-height: 108vh; */
  overflow-y: auto;
  margin: 2rem auto;
  margin-bottom: 2rem;
  text-align: center;

  h4 {
    color: grey;
  }

  tr {
    cursor: pointer;
  }

  @media (max-width: 1024px) {
    width: 95%;
  }
`;

export const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  i {
    font-size: 30px;
    cursor: pointer;
    color: red;

    &:hover {
      font-size: 35px;
      color: var(--secondary-color);
    }
  }
`;

export const Top = styled.div`
  /* background-color: red; */
  width: 90%;
  margin: 2rem 0;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    color: black;
    font-size: 24px;
    line-height: 10px;
  }

  a {
    background-color: var(--accent-color);
    box-shadow: var(--box-shadow);
    padding: 0.3rem 1rem;
    border-radius: var(--border-radius);
    text-decoration: none;
    color: var(--text-white);
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: var(--secondary-color);
      color: var(--accent-color);
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
      padding: 0.2rem;
      border-radius: var(--border-radius);

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
