import React, { Component } from "react";
import { Route } from "react-router-dom";
import MessageList from "./Applicant/Messages/messageList";
import MessageView from "./Applicant/Messages/messageView";

//Import Components
// import RecruiterLoginNavbar from './Navbar/RecruiterLoginNavbar';
import ApplicantLoginNavbar from "./Navbar/ApplicantLoginNavbar";
import UserNavbar from "./Navbar/UserNavbar";
import PostJob from "./Job/jobPost/jobPost";
import ApplicantSignup from "./Applicant/ApplicantSignup/ApplicantSignup";
import RecruiterSignup from "./Recruiter/RecruiterSignup/RecruiterSignup";
import ApplicantProfileView from "./Applicant/ApplicantProfile/ApplicantProfileView";
import RecruiterProfileView from "./Recruiter/RecruiterProfile/RecruiterProfileView";
import Provider from "react-redux/es/components/Provider";
import store from "../store";
import MainRecruiterDashboard from "./Recruiter/RecruiterDashboard/main";
import ViewConnections from "./Connections/ViewConnections";
import ViewPendingRequests from "./Connections/ViewPendingRequests";
import JobDetails from "./Job/jobDetails";
import JobApply from "./Job/jobapply";
import JobSearch from "./Job/jobSearch";
import JobList from "./Job/jobList";
import MainRecruiterJobListing from './Recruiter/RecruiterJobListing/main';
import Temp from './Temp';
import MainRecruiterJobStats from './Recruiter/RecruiterJobStastics/main'; 
// Create a Main Component
class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          {/*Render Different Component based on Route*/}
          <Route exact path="/" component={ApplicantSignup} />
          <Route path="/applicantsignup" component={ApplicantSignup} />
          <Route path="/recruitersignup" component={RecruiterSignup} />
          <Route
            path="/applicantprofileview"
            component={ApplicantProfileView}
          />
          <Route
            path="/recruiterprofileview"
            component={RecruiterProfileView}
          />
          <Route path="/messages" component={MessageList} />
          <Route path="/messageview" component={MessageView} />
          {/* <Route path="/ownerlogin" component={OwnerLogin}/> */}
          <Route path="/profile" component={UserNavbar} />
          <Route path="/job" component={PostJob} />
          <Route path="/jobDetails" component={JobDetails} />
          <Route path="/jobApply" component={JobApply} />

          <Route
            path="/recruiterDashboard"
            component={MainRecruiterDashboard}
          />
           <Route
                        path="/recruiterJobListing"
                        component={MainRecruiterJobListing}
                    />
          <Route path="/viewConnections" component={ViewConnections} />
          <Route path="/viewPendingRequests" component={ViewPendingRequests} />
          <Route path="/jobSearch" component={JobSearch} />
          <Route path="/jobList" component={JobList} />
          <Route path="/temp" component={Temp} />
          <Route path="/recruiterjobstats" component={MainRecruiterJobStats} />
        </div>
      </Provider>
    );
  }
}

//Export The Main Component
export default Main;
