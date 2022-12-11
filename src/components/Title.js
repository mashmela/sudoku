import React from "react";
import styled from "styled-components";

const StyledTitle = styled.h1`
  color: rgb(27, 93, 185);
  letter-spacing: 2.4px;
`;

const Title = ({ children }) => {
  return <StyledTitle>{children}</StyledTitle>;
};

export default Title;
