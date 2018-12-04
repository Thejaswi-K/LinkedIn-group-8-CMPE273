import React, { Component } from "react";
import { Redirect } from "react-router";
import jwtDecode from "jwt-decode";
import ApplicantNavbar from '../Navbar/applicantNavbar';
// import GraphTopTenJobPostingComponent from './GraphDashboardComponents/graphTopTenJobPosting';
import ViewConnection from './ViewConnections';
import LeftRailComponent from './leftrail';
import Recommendations from  './recommendations';
export default class MainApplicantConnections extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applicant: localStorage.getItem('applicantToken')?jwtDecode(localStorage.getItem('applicantToken')).email : "",
      
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
            {redirectVar}

            <ApplicantNavbar />


            <div className="row">

                <div className="col-9">
                    <ViewConnection />
                </div>
                <div className="col-3" style={{ position: "fixed", right: "20px" }}>
                    <div className="row" >
                        <LeftRailComponent />
                    </div>
                    <div className="row">
                        <Recommendations />
                    </div>
                </div>

            </div>
            {/* <div className="row" >
       <GraphTopTenJobPostingComponent/>
        </div> */}

        </div>
      );
  }
}
