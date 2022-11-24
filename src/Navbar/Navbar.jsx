import React from "react";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";
import classes from "./Navbar.module.css";

const Navbar = ({ background }) => {
  return (
    <nav className={`${classes.navbar} ${background}`}>
      <img src={logo} alt="Braniac logo" className={classes.logo} />
      <div className={classes.nav_links}>
        <Link to="/" className={classes.link}>
          Home
        </Link>
        <Link to="/all-report" className={classes.link}>
          Reports
        </Link>
        <Link to="/aboutUs" className={classes.link}>
          About us
        </Link>
        <Link className={classes.link} to="/whyUs">
          Why Us
        </Link>
        <Link className={classes.link} to="/howtoUse">
          How To Use
        </Link>
        <Link className={classes.link} to="/ground-water">
          Ground Water Quality
        </Link>
        <Link to="/userreport" className={classes.link}>
          Make Report
        </Link>
      </div>
      {/* <Button /> */}
    </nav>
  );
};

export default Navbar;
