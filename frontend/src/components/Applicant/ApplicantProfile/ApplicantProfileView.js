import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import Experience from "./experience";
import Education from "./education";
import Summary from "./summary";
import Skills from "./skills";
import jwt_decode from "jwt-decode";
import {applicantDetails, deleteApplicant} from "../../../actions/applicantActions";
import Redirect from "react-router/es/Redirect";
import ProfileNavbar from "../../Navbar/applicantNavbar"


class ApplicantProfileView extends Component {

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
            if (nextProps.applicantProfile.delete !== "") {
                this.isDelete = true;
                alert("User deleted successfully");
                this.isApplicantLoggedIn = false ;
                localStorage.removeItem('applicantToken');
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
                profileImage: this.applicantProfile.profileImage
            })
        }
    }

    deleteClicked(){

        this.props.deleteApplicant(this.email);

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

                <ProfileNavbar/>

                <br/>

                <Summary firstName={this.state.firstName} lastName={this.state.lastName}
                         city={this.state.city} state={this.state.state}
                         profileSummary={this.state.profileSummary} applicantEmail={this.email}
                         profileImage={this.state.profileImage}/>

                <br/>

                <Experience experience={this.state.experience} applicantEmail={this.email}/>


                <Education education={this.state.education} applicantEmail={this.email}/>

                <br/>

                <Skills skills={this.state.skills} applicantEmail={this.email}/>

                <br/>

                <div className="text-center">

                    <button type="submit" onClick={this.deleteClicked.bind(this)}>Delete Profile</button>

                </div>

                <br/>
                <br/>

                <hr/>


            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    applicantErrorReducer: state.applicantErrorReducer,
    applicantProfile: state.applicantProfile
});

export default connect(mapStateToProps, {applicantDetails, deleteApplicant})(ApplicantProfileView);


