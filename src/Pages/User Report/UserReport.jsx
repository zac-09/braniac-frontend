import React from "react";
import classes from "./UserReport.module.css";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

const UserReport = () => {
    return (
      <>
      
      <Navbar background={classes.background} />
      
      <section id="userreport"> 
        <div className={classes.container}>
          
      <h3 className={classes.h3}>PROBLEM REPORT</h3>
        <form>
          <div className={classes.row}>
            <label>
              Name:
              <input type="text" name="name"  className={classes.input}/>
            </label>
            
            <label>
              Number:
              <input name="number" className={classes.input} />
            </label>
            </div>
            <div className={classes.row}>
            <label>
              Address:
              <input type="text" name="name" className={classes.input1} />
            </label>
            </div>
            <div className={classes.row}>
            <label>
              City:
              <input type="text" name="name" className={classes.input2} />
            </label>

            <label>
              State:
              <input type="text" name="name" className={classes.input2}/>
            </label>

            <label>
              Zip:
              <input type="text" name="name" className={classes.input2}/>
            </label>

            </div>
            
            <div className={classes.row}>
            <label>
              Issue description:
              <input type="text" name="name" className={classes.input3} />
            </label>

            </div>
            
            <div className={classes.row}>
            <label>
            Upload issue image
            <input type="file" className={classes.file}/>
            </label>
            </div>
            
            <div className={classes.row}>
            <input type="submit" value="Submit" className={classes.button}/>
            </div>
        </form>
        </div>
      </section>
      
      <Footer/>
      </>
 );
};

export default UserReport;      