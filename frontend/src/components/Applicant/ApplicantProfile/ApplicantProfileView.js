import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import Experience from "./experience";
import Education from "./education";
import Summary from "./summary";
import Skills from "./skills";
import jwt_decode from "jwt-decode";
import {applicantDetails} from "../../../actions/applicantActions";


class ApplicantProfileView extends Component {

    constructor(props) {
        super(props);

        if (localStorage.getItem("applcantToken")) {
            let token = localStorage.getItem("applcantToken");
            this.decodedApplicant = jwt_decode(token);
            this.isApplicantLoggedIn = true;
            this.email = this.decodedApplicant.email ;
        }


    }

    componentDidMount() {


        this.props.applicantDetails(this.email);
    }





    render() {
        return (
            <div>

                <br/>

                <Summary />

                <br/>

                <Experience/>

                <br/>

                <Education/>

                <br/>

                <Skills/>

                <br/>

            </div>


        )

    }


}

const mapStateToProps = (state) => ({



});

export default connect(mapStateToProps, {applicantDetails})(ApplicantProfileView);
