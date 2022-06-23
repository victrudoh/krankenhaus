import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 20px;
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: space-between; */
  /* height: var(--topnav-height); */
  box-shadow: var(--box-shadow-topNav);
  border-radius: var(--border-radius);
  margin: 0.8rem auto;
  margin-bottom: 2rem;
  background-color: var(--text-white);
  font-size: 1rem;

  h6 {
    font-weight: 500;
    font-size: 18px;
    color: grey;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-evenly;
  @media (max-width: 1024px) {
  }
`;
