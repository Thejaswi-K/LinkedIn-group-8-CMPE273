import React, { Component } from "react";
import { Redirect } from "react-router";
import jwtDecode from "jwt-decode";

import RightRailComponent from "./rightrail";
import  UserTraceDashboard from "./userTraceDashboard";
import JobNavbar from "../../Navbar/JobNavbar";
import GraphDashboardMain from "./graphDashboard";
// import GraphTopTenJobPostingComponent from './GraphDashboardComponents/graphTopTenJobPosting';

export default class MainRecruiterDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // recruiter: localStorage.getItem('recruiterToken')?jwtDecode(localStorage.getItem('recruiterToken')).email : "",
      recruiter: "ag@gmail.com"
    };
    this.userTraceRedirect = this.userTraceRedirect.bind(this);
    this.locationTraceRedirect = this.locationTraceRedirect.bind(this);
  }

  userTraceRedirect = (e) =>{
    e.preventDefault();
  
    this.props.history.push({
      pathname:"/traceuser"
      
      })
    }
  
  locationTraceRedirect = (e) =>{
      e.preventDefault();
    
      this.props.history.push({
        pathname:"/tracelocation"
        
        })
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
          <div className="row">
               <RightRailComponent />
          </div>
          <div className="row" >
              <div classname="col-6" >
                <button className="btn btn-lg btn-primary" style={{margin:"20px", marginLeft:"70px", width:"14rem"}} onClick={this.userTraceRedirect} >User Trace</button>
              </div>
              <div classname="col-6" >
                <button className="btn btn-lg btn-primary" style={{margin:"20px", marginLeft:"60px"}} onClick={this.locationTraceRedirect}>Location Trace</button>
              </div>
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
