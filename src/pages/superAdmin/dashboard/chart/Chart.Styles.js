import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 20px;
  box-shadow: var(--box-shadow-topNav);
  border-radius: var(--border-radius);
  margin: 2rem auto;
  margin-bottom: 2rem;
  background-color: var(--text-white);
  font-size: 1rem;

  @media (max-width: 1024px) {
    /* width: 98%; */
    /* margin: 0 auto; */
  }
`;
