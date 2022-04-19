import React from "react";
import Wrapper, { TWrapperVariant } from "./Wrapper";
import NavBar from "./NavBar";

interface ILayoutProps {
  variant?: TWrapperVariant;
}

const Layout: React.FC<ILayoutProps> = ({ children, variant }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

export default Layout;
