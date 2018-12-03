import React, {Component} from "react";
import ProfileNavbar from "../../Navbar/recruiterNavbar"
import Summary from "../../Recruiter/RecruiterProfile/summary";
import connect from "react-redux/es/connect/connect";
import {recruiterDetails} from "../../../actions/recruiterActions";
import jwt_decode from "jwt-decode";
import Redirect from "react-router/es/Redirect";

class RecruiterProfileView extends Component {

    isApplicantLoggedIn = false;

    constructor(props){
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            city: "",
            state: "",
            companyName: "",
            profileImage:"",

        };

        if (localStorage.getItem("recruiterToken")) {
            let token = localStorage.getItem("recruiterToken");
            this.decodedApplicant = jwt_decode(token);
            this.isRecruiterLoggedIn = true;
            this.email = this.decodedApplicant.email;

        }
    }

    componentDidMount() {
        this.props.recruiterDetails(this.email);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.recruiterProfile.recruiterProfile !== "") {
            this.recruiterProfile = nextProps.recruiterProfile.recruiterProfile;
            this.setState({
                ...this.state,
                firstName: this.recruiterProfile.firstName,
                lastName: this.recruiterProfile.lastName,
                city: this.recruiterProfile.city,
                state: this.recruiterProfile.state,
                companyName: this.recruiterProfile.companyName,
                experience: this.recruiterProfile.experience,
                education: this.recruiterProfile.education,
                skills: this.recruiterProfile.skills,
                profileImage:this.recruiterProfile.profileImage
            })
        }
    }

    render() {
        if (!this.isRecruiterLoggedIn) {
            return <Redirect to="/recruitersignup"/>
        }

        return (
            <div>
                <ProfileNavbar/>

                <br/>

                <Summary firstName={this.state.firstName} lastName={this.state.lastName}
                         city={this.state.city} state={this.state.state}
                         companyName={this.state.companyName} applicantEmail={this.email}
                         profileImage={this.state.profileImage}/>

            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    recruiterErrorReducer: state.recruiterErrorReducer,
    recruiterProfile: state.recruiterProfile

});

export default connect(mapStateToProps, {recruiterDetails})(RecruiterProfileView);