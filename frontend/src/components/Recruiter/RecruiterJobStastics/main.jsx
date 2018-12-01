import React, { Component } from "react";
import { Redirect } from "react-router";
import jwtDecode from "jwt-decode";

// import LeftRailComponent from "./rightrail";
import  JobStats from "./jobStats";
import JobNavbar from "../../Navbar/JobNavbar";

export default class MainRecruiterJobStats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // recruiter: localStorage.getItem('recruiterToken')?jwtDecode(localStorage.getItem('recruiterToken')).email : "",
      recruiter: "recruiter1@gmail.com"
    };
  }

  render() {
    // check for auth flag
    let redirectVar = null;
    if (!localStorage.getItem("recruiterToken")) {
      redirectVar = <Redirect to="/recruiterSignup" />;
    }
    return (
      <div
        style={{
          minHeight: "100vh",
          minWidth: "100%",
          boxSizing: "border-box",
          backgroundColor: "#f4f4f4",
          borderRadius: "15px"
        }}
      >
        {/* {redirectVar} */}

        <JobNavbar />

       
        <div className="row">
        <div className="col-2">
            {/* <LeftRailComponent /> */}
            <h1> Hello there!</h1>
        </div>
        <div className="col-10">
          <JobStats/>
        </div>
          

        </div>


      </div>
    );
  }
}
