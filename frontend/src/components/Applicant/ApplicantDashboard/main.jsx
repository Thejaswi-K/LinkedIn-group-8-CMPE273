import React, { Component } from "react";
import { Redirect } from "react-router";
import jwtDecode from "jwt-decode";

import RightRailComponent from "./rightrail";
import ApplicantNavbar from "../../Navbar/applicantNavbar";

export default class MainApplicantDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applicant: localStorage.getItem('applicantToken')?jwtDecode(localStorage.getItem('applicantToken')).email : "",
    //   applicant: "ag@gmail.com"
    };
  }

  render() {
    // check for auth flag
    let redirectVar = null;
    if (!localStorage.getItem("applicantToken")) {
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
        <ApplicantNavbar />

   

       
        <div className="row">
        <div className="col-9">
           
          </div>
          
          <div className="col-3" style={{position: "fixed", right:"20px"}}>
            <RightRailComponent />
          </div>
        </div>
        {/* <div className="row" >
       <GraphTopTenJobPostingComponent/>
        </div> */}

      </div>
    );
  }
}
