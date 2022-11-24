import React from "react";
import Button from "../../Button/Button";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import WhyUs from "../Why Us/WhyUs";
import HowToUse from "../How To Use/HowToUse";
import ScrollToTop from "react-scroll-to-top";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <>
      <ScrollToTop smooth component={<p style={{ color: "#049b8c" }}>UP</p>}/>
      <div className={classes.home}>
        <Navbar background={classes.background} />
        <div className={classes.home_content}>
          <h1>Decision Support Tool for Inclusive Sanitation Intervention</h1>
          <p>
            Spatially demarcate area at settlement level and recommend on the
            suitable sanitation intervention options to decision makers.support
            in decision making for range of sanitation intervention in cityscape
          </p>
          <Button />
        </div>
      </div>
      <WhyUs/>
      <HowToUse/>
      <Footer/>
    </>
  );
};

export default Home;
