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
  max-height: 550px;

  @media (max-width: 1024px) {
    width: 80%;
    margin: 0 auto;
  }
`;

export const Content = styled.div`
  /* background-color: red; */
  width: 95%;
  position: relative;

  .pair {
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;

    label {
      margin: 0.3rem;
      font-weight: 500;
    }

    input {
      width: 100%;
      padding: 0.5rem;
      border-radius: 10px 10px 0 0;
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

export const List = styled.div`
  position: absolute;
  width: 100%;
  background-color: white;
  box-shadow: var(--box-shadow);
  /* padding: 1rem; */
  border-radius: 0 0 10px 10px;
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  flex-direction: column;
  margin-bottom: 2rem;
  min-height: 3rem;
  max-height: 200px;
  overflow-y: hidden;

  &:hover {
    overflow-y: scroll;
  }

  ul {
    list-style: none;
    /* background-color: red; */
    padding: 0;
  }

  li {
    padding: 0.5rem;
    width: 100%;
    /* background-color: yellow; */
    border-bottom: 0.5px dotted grey;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    word-wrap: break-word;

    &:hover {
      background-color: skyblue;
    }
  }

  /* Scrollbar stuff */
  &::-webkit-scrollbar {
    width: 12px;
    margin: 0 1rem;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px var(--accent-color);
    border-radius: 10px;
  }

  @media (max-width: 1024px) {
    width: 80%;
    margin: 0 auto;
  }
`;

export const ManualAdd = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: var(--box-shadow);
  padding: 1rem;
  border-radius: var(--border-radius);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 1rem 0;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: skyblue;
    color: white;
  }

  @media (max-width: 1024px) {
    width: 80%;
    margin: 0 auto;
  }
`;
