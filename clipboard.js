import styled from "styled-components";

export const Wrapper = styled.div`
  @media (max-width: 1024px) {
  }
`;

export const Content = styled.div`
  @media (max-width: 1024px) {
  }
`;

// ************************* //
try {
  const foundTellers = await users.filter((item) =>
    item.department.includes("Bank")
  );
  setTellers(foundTellers);
} catch (err) {
  error("Couldn't fetch tellers");
  console.log(err);
}
