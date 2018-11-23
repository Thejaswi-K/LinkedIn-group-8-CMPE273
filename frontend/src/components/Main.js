import React, {Component} from 'react';
import {Route} from 'react-router-dom';

//Import Components
// import RecruiterLoginNavbar from './Navbar/RecruiterLoginNavbar';
import ApplicantLoginNavbar from './Navbar/ApplicantLoginNavbar';
import ApplicantSignup from './Applicant/ApplicantSignup/ApplicantSignup';
import RecruiterSignup from './Recruiter/RecruiterSignup/RecruiterSignup';
import UserNavbar from './Navbar/UserNavbar';
import JobNavbar from './Navbar/JobNavbar';
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
            <div>
                {/*Render Different Component based on Route*/}
                <Route exact path="/" component={ApplicantLoginNavbar}/>
                <Route path="/applicantsignup" component={ApplicantSignup}/>
                <Route path="/recruitersignup" component={RecruiterSignup}/>
                <Route path="/profile" component={UserNavbar}/>
                <Route path="/job" component={JobNavbar}/>
                {/* <Route path="/editprofile" component={EditProfile}/> */}
                {/* <Route path="/postproperty" component={PostProperty}/> */}
                {/* <Route path="/searchproperty" component={SearchProperty}/> */}
                {/* <Route path="/propertydetail" component={PropertyDetail}/> */}
                {/* <Route path="/travelertrips" component={TravelerBookedProperties}/> */}
                {/* <Route path="/ownerpostings" component={OwnerPostedProperties}/> */}
                {/* <Route path="/inbox" component={Inbox}/> */}
            </div>
        )
    }
}
//Export The Main Component
export default Main;