import React, { Component } from "react";
import { Redirect } from "react-router";
import jwtDecode from "jwt-decode";

// import LeftRailComponent from "./rightrail";
import  JobStats from "./jobStats";
import JobNavbar from "../../Navbar/JobNavbar";
import  LeftRailComponent from "./jobstatLeftRail";

export default class MainRecruiterJobStats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // recruiter: localStorage.getItem('recruiterToken')?jwtDecode(localStorage.getItem('recruiterToken')).email : "",
      recruiter: "testrecruiter2@gmail.com",
      jobId : this.props.location.state
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
        <div className="col-3">
            <LeftRailComponent jobId={this.state.jobId}/>
            {/* <h1> Hello there!</h1> */}
        </div>
        <div className="col-9">
          <JobStats jobId={this.state.jobId}/>
        </div>
          

        </div>


      </div>
    );
  }
}
