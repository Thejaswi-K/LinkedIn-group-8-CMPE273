import React, { Component } from "react";
import { Redirect } from "react-router";
import jwtDecode from "jwt-decode";

import RightRailComponent from "./rightrail";
import  UserTraceDashboard from "./userTraceDashboard";
import JobNavbar from "../../Navbar/JobNavbar";
import GraphDashboardMain from "./graphDashboard";
export default class MainRecruiterDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // recruiter: localStorage.getItem('recruiterToken')?jwtDecode(localStorage.getItem('recruiterToken')).email : "",
      recruiter: "ag@gmail.com"
    };
  }

  render() {
    // check for auth flag
    let redirectVar = null;
    if (!localStorage.getItem("recruiterToken")) {
      redirectVar = <Redirect to="/" />;
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
        <div className="col-9">
            <GraphDashboardMain />
          </div>
          
          <div className="col-3" style={{position: "fixed", right:"20px"}}>
            <RightRailComponent />
          </div>
        </div>
        <div className="row" >
          <div className="col-9">
            <UserTraceDashboard />
          </div>
        </div>

      </div>
    );
  }
}
