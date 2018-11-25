import React, {Component} from 'react';
import {Route} from 'react-router-dom';

//Import Components
// import RecruiterLoginNavbar from './Navbar/RecruiterLoginNavbar';
import ApplicantLoginNavbar from './Navbar/ApplicantLoginNavbar';
import UserNavbar from './Navbar/UserNavbar';
import PostJob from './Job/jobPost';
import ApplicantSignup from './Applicant/ApplicantSignup/ApplicantSignup';
import RecruiterSignup from './Recruiter/RecruiterSignup/RecruiterSignup';
import ApplicantProfileView from "./Applicant/ApplicantProfile/ApplicantProfileView";
import Provider from "react-redux/es/components/Provider";
import store from "../store";
import MainRecruiterDashboard from "./Recruiter/RecruiterDashboard/main";
// import OwnerSignup from './OwnerSignup/OwnerSignup';
// import TravelerLogin from './TravelerLogin/TravelerLogin';
// import TravelerSignup from './TravelerSignup/TravelerSignup';
// import PostProperty from './PostProperty/PostProperty';
// import SearchProperty from './SearchProperty/SearchProperty';
// import PropertyDetail from './PropertyDetail/PropertyDetail';
// import TravelerBookedProperties from './TravelerBookedProperties/TravelerBookedProperties';
// import OwnerPostedProperties from './OwnerPostedProperties/OwnerPostedProperties';
// import Inbox from './Inbox/Inbox';

// Create a Main Component
class Main extends Component {
    render(){
        return(
            <Provider store={store}>
                <div>
                    {/*Render Different Component based on Route*/}
                    <Route exact path="/" component={ApplicantLoginNavbar} />
                    <Route path="/applicantsignup" component={ApplicantSignup} />
                    <Route path="/recruitersignup" component={RecruiterSignup} />
                    <Route path="/profile" component={UserNavbar} />
                    <Route path="/job" component={PostJob} />
                    <Route path="/applicantprofileview" component={ApplicantProfileView} />
                    <Route path="/recruiterDashboard" component={MainRecruiterDashboard} />
                    {/* <Route path="/editprofile" component={EditProfile}/> */}
                    {/* <Route path="/postproperty" component={PostProperty}/> */}
                    {/* <Route path="/searchproperty" component={SearchProperty}/> */}
                    {/* <Route path="/propertydetail" component={PropertyDetail}/> */}
                    {/* <Route path="/travelertrips" component={TravelerBookedProperties}/> */}
                    {/* <Route path="/ownerpostings" component={OwnerPostedProperties}/> */}
                    {/* <Route path="/inbox" component={Inbox}/> */}
                </div>
            </Provider>
        )
    }        
}

//Export The Main Component
export default Main;
