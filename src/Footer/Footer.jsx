import React from "react";
import classes from "./Footer.module.css";
import logo from "../Images/Union.png";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <img src={logo} alt="logo" className={classes.logo} />
      <p id={classes.footer_paragraph}>
        Lorem ipsum dolor sit amet, consectetur adip elit.Posuere dolor massa,{" "}
        <br />
        pellentesque.
      </p>
      <div className={classes.footer_Line} />
      <p>&#169; 2021 Copyright Wezesha.com</p>
    </footer>
  );
};

export default Footer;
