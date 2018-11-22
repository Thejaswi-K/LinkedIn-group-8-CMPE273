import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import * as Validation from "../../validation/ValidationUtil";
import {applicantLogin} from "../../actions/applicantActions";
import Redirect from "react-router/es/Redirect";

class ApplicantLoginNavbar extends Component {

    constructor(props) {
        super()
        this.state = {
            email: "",
            password: "",
            isRecruiter: false,
            userExists: false,
            isLoggedIn: false,
            messageDiv: "",
            success: false
        };


    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.applicantProfile.applicantUser !== "") {
            this.setState({
                ...this.state,
                success: true
            })
        } else if (nextProps.applicantErrorReducer.error !== "") {
            alert(nextProps.applicantErrorReducer.error);
        }
    }


    doLogin = (event) => {
        event.preventDefault();
        let valid = Validation.loginValidations(this.state);
        if (valid === '') {
            const data = {
                password: this.state.password,
                email: this.state.email
            }
            this.props.applicantLogin(data, this.props.history);
        } else {
            this.setState({
                ...this.state,
                messageDiv: valid
            })
        }

    };

    render() {

        if (this.state.success) {
            return <Redirect to="/applicantprofileview"/>
        }

        let message = null;
        if (this.state.messageDiv !== '') {
            message = (
                <div className="clearfix">
                    <div className="alert alert-info text-center" role="alert">{this.state.messageDiv}</div>
                </div>
            );
        } else {
            message = (
                <div></div>
            );
        }

        return (
            <div>
                <div className="header">
                    <div className="wrapper">
                        <h1>
                            <img className="lazy-loaded" alt="LinkedIn"
                                 src="https://static.licdn.com/sc/h/95o6rrc5ws6mlw6wqzy0xgj7y"/>
                        </h1>
                        <form className="login-form"
                              action="https://www.linkedin.com/uas/login-submit?loginSubmitSource=GUEST_HOME"
                              method="POST">
                            <label for="login-email">Email</label>
                            <input type="text" name="email" className="login-email"
                                   autocapitalize="off" tabindex="1" id="login-email" placeholder="Email"
                                   autofocus="autofocus" dir="ltr" onChange={(e) => {
                                this.setState({[e.target.name]: e.target.value})
                            }}/>
                            <label for="login-password">Password</label>
                            <input type="password" name="password" className="login-password"
                                   id="login-password" aria-required="true" tabindex="1" placeholder="Password"
                                   dir="ltr" onChange={(e) => {
                                this.setState({[e.target.name]: e.target.value})
                            }}/>
                            <input tabindex="1" id="login-submit" className="login submit-button" type="submit"
                                   value="Sign in" onClick={this.doLogin.bind(this)}/>

                            <div></div>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    applicantErrorReducer: state.applicantErrorReducer,
    applicantProfile: state.applicantProfile
});
export default connect(mapStateToProps, {applicantLogin})(ApplicantLoginNavbar);