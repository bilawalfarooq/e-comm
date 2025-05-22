import React from "react";
import "../styles/App.css";

const Footer = () => (
  <footer className="footer">
    <div className="container footer__content">
      <span>© {new Date().getFullYear()} ShopEase. All rights reserved.</span>
    </div>
  </footer>
);

export default Footer;
