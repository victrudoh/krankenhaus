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

  button {
    padding: 0.5rem;
    border-radius: var(--border-radius);
    background-color: var(--accent-color);
    color: var(--text-white);

    &:hover {
      color: var(--accent-color);
      background-color: var(--secondary-color);
    }
  }

  @media (max-width: 1024px) {
    width: 96%;
    margin: 0 auto;
  }
`;

export const Top = styled.div`
  /* background-color: red; */
  width: 100%;
  /* margin: 1.5rem 0; */
  margin-bottom: 0.2rem;
  display: flex;
  justify-content: space-between;

  .pair {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1rem;
    /* background-color: green; */
    font-size: 23px;
    /* width: 60%; */

    h4 {
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
    }
  }

  @media (max-width: 1024px) {
  }
`;

export const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    color: grey;
  }

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

export const Bottom = styled.div`
  background-color: red;
  width: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: end;
`;
