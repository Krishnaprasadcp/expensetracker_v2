import React from "react";
const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <nav>About NavBar</nav>
      {children}
    </>
  );
};
export default AboutLayout;
