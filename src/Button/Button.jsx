import React from "react";
import { Link } from "react-router-dom";

import classes from "./Button.module.css";
const Button = () => {
  return (
    <Link to="/login" className={classes.button}>
      Get Started
    </Link>
  );
};

export default Button;
