import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import Experience from "./experienceonly";
import Education from "./educationonly";
import Summary from "./summaryonly";
import Skills from "./skillsonly";
import jwt_decode from "jwt-decode";
import {applicantDetails, deleteApplicant, deleteUser} from "../../../actions/applicantActions";
import Redirect from "react-router/es/Redirect";
import ProfileNavbar from "../../Navbar/applicantNavbar"
import axios from "axios";
import {CONSTANTS} from '../../../Constants'

class ApplicantProfileViewOnly extends Component {

    applicantProfile = {};
    isApplicantLoggedIn = false;
    isDelete = false;

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            city: "",
            state: "",
            profileSummary: "",
            profileImage: "",
            experience: [],
            education: [],
            skills: [],
            zipcode: "",
            gender: "",
            resume: ""
        };



    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.applicantProfile.applicantProfile !== "") {

            this.applicantProfile = nextProps.applicantProfile.applicantProfile;
            if (nextProps.applicantProfile.delete !== "") {
                this.isDelete = true;
                alert("User deleted successfully");
                this.isApplicantLoggedIn = false;
                localStorage.removeItem('applicantToken');
                this.props.deleteUser();
            }
            this.setState({
                ...this.state,
                firstName: this.applicantProfile.firstName,
                lastName: this.applicantProfile.lastName,
                city: this.applicantProfile.city,
                state: this.applicantProfile.state,
                profileSummary: this.applicantProfile.profileSummary,
                experience: this.applicantProfile.experience,
                education: this.applicantProfile.education,
                skills: this.applicantProfile.skills,
                profileImage: this.applicantProfile.profileImage,
                zipcode: this.applicantProfile.zipcode,
                gender: this.applicantProfile.gender,
                resume: this.applicantProfile.resume
            })
        }
    }




    componentDidMount() {
        this.props.applicantDetails(this.props.location.state);

        
        axios.defaults.withCredentials = true;
        //setAuthToken(localStorage.getItem("recruiterToken"));
        let trackerdata = { "page": "4" };
        axios
            .put(`${CONSTANTS.BACKEND_URL}/recruiters/track/` + this.email, trackerdata)
            .then(response => {
                console.log("Applicant Profile View Tracked ", response.data);

            })
            .catch(function (error) {
                console.log("errored");
                console.log(error);
            });

    }


    render() {


        return (
            <div>

                <ProfileNavbar/>

                <br/>

                <Summary firstName={this.state.firstName} lastName={this.state.lastName}
                         city={this.state.city} state={this.state.state}
                         profileSummary={this.state.profileSummary} applicantEmail={this.email}
                         profileImage={this.state.profileImage} zipcode={this.state.zipcode} gender={this.state.gender}
                         resume={this.state.resume}/>

                <br/>

                <Experience experience={this.state.experience} applicantEmail={this.email}/>


                <Education education={this.state.education} applicantEmail={this.email}/>

                <br/>

                <Skills skills={this.state.skills} applicantEmail={this.email}/>



            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    applicantErrorReducer: state.applicantErrorReducer,
    applicantProfile: state.applicantProfile
});

export default connect(mapStateToProps, {applicantDetails, deleteApplicant, deleteUser})(ApplicantProfileViewOnly);


