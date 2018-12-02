import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import Experience from "./experience";
import Education from "./education";
import Summary from "./summary";
import Skills from "./skills";
import jwt_decode from "jwt-decode";
import {applicantDetails} from "../../../actions/applicantActions";
import {deleteApplicant} from "../../../actions/applicantActions";
import Redirect from "react-router/es/Redirect";
import ProfileNavbar from "../../Navbar/applicantNavbar"
import Button from "@material-ui/core/es/Button/Button";


class ApplicantProfileView extends Component {

    applicantProfile = {};
    isApplicantLoggedIn = false;
    isDelete = false ;

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            city: "",
            state: "",
            profileSummary: "",
            profileImage:"",
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
            if(this.applicantProfile.delete !== ""){
                this.isDelete = true ;
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
                profileImage:this.applicantProfile.profileImage
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

        if (!this.isDelete) {
            return <Redirect to="/applicantsignup"/>
        }

        var deleteButton = <Button name="Delete" onClick={this.props.deleteApplicant(this.email)}/>

        return (
            <div>

                <ProfileNavbar/>

                <br/>

                <Summary firstName={this.state.firstName} lastName={this.state.lastName}
                         city={this.state.city} state={this.state.state}
                         profileSummary={this.state.profileSummary} applicantEmail={this.email} profileImage={this.state.profileImage}/>

                <br/>

                <Experience experience={this.state.experience} applicantEmail={this.email}/>


                <Education education={this.state.education} applicantEmail={this.email}/>

                <br/>

                <Skills skills={this.state.skills} applicantEmail={this.email}/>

                <br/>

                <div>
                    {deleteButton}
                </div>





            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    applicantErrorReducer: state.applicantErrorReducer,
    applicantProfile: state.applicantProfile
});

export default connect(mapStateToProps, {applicantDetails, deleteApplicant})(ApplicantProfileView);


