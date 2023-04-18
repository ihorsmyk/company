import { FC } from "react";
import "./Footer.scss";

const Footer: FC = () => {
  return (
    <footer className="footer container">
      <h2 className="footer__title">© 2023 ISG</h2>
      <p className="footer__member1">Igor Tryniak</p>
      <p className="footer__member2">Igor Smyk</p>
    </footer>
  );
};

export default Footer;
