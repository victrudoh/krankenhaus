import styled from "styled-components";

export const Wrapper = styled.div`
  width: 30%;
  background-color: white;
  box-shadow: var(--box-shadow);
  padding: 1rem 0 1rem 1rem;
  border-radius: var(--border-radius);
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;
  height: 40rem;

  @media (max-width: 1024px) {
    width: 80%;
    margin: 0 auto;
  }
`;

export const Content = styled.div`
  /* background-color: red; */
  width: 95%;
  height: 75vh;
  padding-right: 0.3rem;
  overflow-y: hidden;

  &:hover {
    overflow-y: scroll;
  }

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
