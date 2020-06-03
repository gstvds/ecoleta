import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import logo from "../assets/logo.svg";

interface HeaderProps {
  create?: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { create } = props;
  return (
    <header>
      <img src={logo} alt="logo-ecoleta" />

      {create && (
        <Link to="/">
          <FiArrowLeft />
          voltar para home
        </Link>
      )}
    </header>
  );
};

export default Header;
