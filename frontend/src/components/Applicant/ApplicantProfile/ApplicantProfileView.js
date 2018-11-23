import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import Experience from "./experience";
import Education from "./education";
import Summary from "./summary";
import Skills from "./skills";
import jwt_decode from "jwt-decode";
import {applicantDetails} from "../../../actions/applicantActions";
import Redirect from "react-router/es/Redirect";


class ApplicantProfileView extends Component {

    applicantProfile = {};
    isApplicantLoggedIn = false;

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            city: "",
            state: "",
            profileSummary: "",
            experience: [],
            education: [],
            skills: []
        };

        if (localStorage.getItem("applicantToken")) {
            let token = localStorage.getItem("applicantToken");
            this.decodedApplicant = jwt_decode(token);
            this.isApplicantLoggedIn = true;
            this.email = this.decodedApplicant.email;

        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.applicantProfile.applicantProfile !== "") {
            this.applicantProfile = nextProps.applicantProfile.applicantProfile;
            this.setState({
                ...this.state,
                firstName: this.applicantProfile.firstName,
                lastName: this.applicantProfile.lastName,
                city: this.applicantProfile.city,
                state: this.applicantProfile.state,
                profileSummary: this.applicantProfile.profileSummary,
                experience: this.applicantProfile.experience,
                education: this.applicantProfile.education,
                skills: this.applicantProfile.skills
            })
        }
    }

    componentDidMount() {
        this.props.applicantDetails(this.email);
    }

    render() {
        if (!this.isApplicantLoggedIn) {
            return <Redirect to="/applicantsignup"/>
        }

        return (
            <div>

                <br/>

                <Summary firstName={this.state.firstName} lastName={this.state.lastName}
                         city={this.state.city} state={this.state.state}
                         profileSummmary={this.state.profileSummary}/>

                <br/>

                <Experience experience={this.state.experience}/>

                <br/>

                <Education education={this.state.education}/>

                <br/>

                <Skills skills={this.state.skills}/>

                <br/>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    applicantErrorReducer: state.applicantErrorReducer,
    applicantProfile: state.applicantProfile
});

export default connect(mapStateToProps, {applicantDetails})(ApplicantProfileView);


