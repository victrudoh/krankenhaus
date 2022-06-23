import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 1rem;
  box-shadow: var(--box-shadow-topNav);
  border-radius: var(--border-radius);
  margin: 0.8rem auto;
  background-color: var(--secondary-color);
  font-size: 1rem;
  width: 20%;
  transition: all 500ms;
  cursor: pointer;

  &:hover {
    background-color: var(--accent-color);
    color: var(--text-white);
  }

  i {
    font-size: 40px;
    margin: 1rem 0;

    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    -webkit-animation-iteration-count: infinite;

    @keyframes bounce {
      0%,
      100%,
      20%,
      50%,
      80% {
        -webkit-transform: translateY(0);
        -ms-transform: translateY(0);
        transform: translateY(0);
      }
      40% {
        -webkit-transform: translateY(-30px);
        -ms-transform: translateY(-30px);
        transform: translateY(-30px);
      }
      60% {
        -webkit-transform: translateY(-15px);
        -ms-transform: translateY(-15px);
        transform: translateY(-15px);
      }
    }

    &:hover {
      animation-name: bounce;
      -moz-animation-name: bounce;
    }
  }

  h5 {
    font-family: roboto;
  }

  h3 {
    font-weight: 500;
    font-size: 35px;
    font-family: tahoma;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;
