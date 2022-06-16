// Dependencies
import styled from "styled-components";

export const LayoutStyle = styled.div`
  background-color: var(--bg-color);
  /* background-color: coral; */
  min-height: 100vh;
  display: flex;
  gap: 0.5rem;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: red; */
  width: 100%;
  margin-left: 260px;

  @media (max-width: 768px) {
    margin-left: 90px;
  }
`;
