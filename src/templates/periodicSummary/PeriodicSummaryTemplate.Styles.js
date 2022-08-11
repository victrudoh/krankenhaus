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

  .printInvoice {
    width: 300px;
    text-align: center;
    margin: auto;
    padding: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  }

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
