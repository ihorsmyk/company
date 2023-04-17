import { Link } from "react-router-dom";
import "./Logo.scss";

const Logo: React.FC = () => {
  return (
    <Link className="" to="/">
      <h2 className="logo">
        IGOR <span className="logo__span">GROWTH</span>
      </h2>
    </Link>
  );
};

export default Logo;
