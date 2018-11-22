import React, { Component } from 'react';
import $ from 'jquery';
import {CONSTANTS} from '../../Constants';

class RecruiterLoginNavbar extends Component {
    constructor(props) {
        super()
        this.state = {
            email: "",
            password: "",
            isRecruiter: true,
            userExists: false
        }

        // Bind the handlers to this class
        // this.closeDialogHandler = this.closeDialogHandler.bind(this);
        // this.searchStartDateChangeHandler = this.searchStartDateChangeHandler.bind(this);
        // this.searchEndDateChangeHandler = this.searchEndDateChangeHandler.bind(this);
        // this.searchHeadCountChangeHandler = this.searchHeadCountChangeHandler.bind(this);
        // this.searchHandler = this.searchHandler.bind(this);
        // this.notOwnerHandler = this.notOwnerHandler.bind(this);
    }

    componentDidMount = () => {
        $(document).ready(function () {
            $('#cl').on('click', function () {
                $('#login-callout').addClass('hidden');
            });
        });
    }

    render() {
        return(
            <div>
                <div className="header">
                    <div className="wrapper">
                        <h1>
                            <img className="lazy-loaded" alt="LinkedIn" src="https://static.licdn.com/sc/h/95o6rrc5ws6mlw6wqzy0xgj7y" />
                        </h1>
                        <form className="login-form" action="https://www.linkedin.com/uas/login-submit?loginSubmitSource=GUEST_HOME"
                            method="POST">
                            <label for="login-email">Email</label>
                            <input type="text" name="session_key" className="login-email"
                                autocapitalize="off" tabindex="1" id="login-email" placeholder="Email" autofocus="autofocus" dir="ltr" />
                            <label for="login-password">Password</label>
                        <input type="password" name="session_password" className="login-password"
                            id="login-password" aria-required="true" tabindex="1" placeholder="Password" dir="ltr" />
                        <input tabindex="1" id="login-submit" className="login submit-button" type="submit" value="Sign in" />
                        {(!this.state.isRecruiter) ?
                            <a className="link-forgot-password" tabindex="1" href={CONSTANTS.ROOTURL+"/RecruiterSignup"}>Recruiter?</a>
                            :
                            <a className="link-forgot-password" tabindex="1" href={CONSTANTS.ROOTURL+"/ApplicantSignup"}>Applicant?</a>
                        }
                        {(this.state.userExists) ?
                        <div id="login-callout" className="hopscotch-bubble animated hopscotch-callout no-number" tabindex="-1"
                            role="alert" aria-live="polite">
                            <div className="hopscotch-bubble-container">
                                <div className="hopscotch-bubble-content">
                                    <h3 className="hopscotch-title">Trying to sign in?</h3>
                                    <div className="hopscotch-content">
                                        Someone's already using that email. If that’s you, enter your
                                        Email and password here to sign in.
                                    </div>
                                </div>
                                <a id ="cl" title="Close" href="#" className="hopscotch-bubble-close hopscotch-close">Close</a>
                            </div>
                            <div className="hopscotch-bubble-arrow-container hopscotch-arrow up"></div>
                        </div> :
                        <div></div>
                        }
                    </form>
                </div>
            </div>
            </div >
        )
    }
}

export default RecruiterLoginNavbar;