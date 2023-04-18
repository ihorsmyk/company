import { FC } from "react";
import { Link } from "react-router-dom";
import "./Logo.scss";

const Logo: FC = () => {
  return (
    <Link className="logo__link" to="/">
      <h1 className="logo">
        I<span className="logo__span">GO</span>R
        <span className="logo__span">GROW</span>TH
      </h1>
    </Link>
  );
};

export default Logo;
