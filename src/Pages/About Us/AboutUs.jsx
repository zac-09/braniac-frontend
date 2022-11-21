import React from "react";
import Navbar from "../../Navbar/Navbar";
import classes from "./AboutUs.module.css";
import aboutus from "../../Images/Rectangle 3.png";
import vector from "../../Images/Vector.png";
import Footer from "../../Footer/Footer";

const AboutUs = () => {
  return (
    <>
      <Navbar background={classes.background} />
      <h3 className={classes.h3}>About us</h3>
      <div className={classes.container}>
        <div className={classes.images}>
          <img src={vector} alt="vector" id={classes.vector} />
          <img src={aboutus} alt="people" id={classes.aboutus_top} />
          <img src={aboutus} alt="people" id={classes.aboutus_bottom} />
        </div>
        <div className={classes.content}>
          <h4 className={classes.h4}>Who we are</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur. Facilisi elementum tortor
            faucibus pretium tempor. Aliquam tincidunt magna porttitor
            adipiscing ut euismod pharetra ullamcorper nunc. Hendrerit bibendum
            odio sed massa molestie. Suspendisse et augue eget nec mauris
            laoreet. Volutpat proin purus enim aliquam nisi id non orci
            bibendum. Netus sit placerat auctor accumsan in purus metus
            pulvinar. Volutpat amet sit massa tellus laoreet aliquet pharetra
            lobortis at. Luctus diam aliquam cras morbi nisl pharetra rhoncus.
            Congue nunc vulputate diam quam ut non massa eu tempor. Volutpat
            pretium leo dolor lobortis massa amet. Lorem vitae interdum eget in.
            Odio enim feugiat massa consequat egestas felis ultricies eget.
            Integer tellus risus nullam sed velit.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
