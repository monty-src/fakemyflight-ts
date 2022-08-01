import React from "react";
import Image from "next/image";
import Logo from "../public/logo.png";

const Header = (): JSX.Element => {
  return (
    <header>
      <Image src={Logo} />
    </header>
  );
};

export default Header;
