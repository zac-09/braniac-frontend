import React from "react";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";
import classes from "./Navbar.module.css";
import Button from "../Button/Button";

const Navbar = ({ background }) => {
  return (
    <nav className={`${classes.navbar} ${background}`}>
    <img src={logo} alt="logo" className={classes.logo} />
      <div className={classes.nav_links}>
        <Link to="/" className={classes.link}>
          Home
        </Link>
        <Link to="/aboutUs" className={classes.link}>
          About us
        </Link>
        <a className={classes.link} href="#whyUs">
          Why Us
        </a>
        <a className={classes.link} href="#howtoUse">
          How To Use
        </a>
      </div>
      <Button />
    </nav>
  );
};

export default Navbar;
