import React, { Component } from 'react';
import ApplicantLoginNavbar from '.././../Navbar/ApplicantLoginNavbar';
import Loginfooter from './FooterSignup';

class ApplicantSignup extends Component {
    render() {
        return(
            <div>
                <ApplicantLoginNavbar/>
                <div id="main-container" className="main background lazy-loaded show-login   " 
                style={{backgroundImage: "url('https://static.licdn.com/sc/h/64xk850n3a8uzse6fi11l3vmz')"}}>
                    <form id="regForm" className="reg-form" action="https://www.linkedin.com/start/join-prefill" method="POST" data-jsenabled="check">
                        <h2 className="title">Be great at what you do</h2>
                        <h3 className="subtitle">Get started - it's free.</h3>
                        <div className="reg-alert hidden" role="alert" tabindex="-1">
                            <div className="wrapper">
                                <p className="message"><span className="alert-content"></span></p>
                                <button className="dismiss dismiss-alert">
                                    <li-icon type="cancel-icon" size="small" a11y-text="Dismiss"></li-icon>
                                </button>
                            </div>
                        </div>
                        <section className="form-body">
                            <label for="reg-firstname">First name</label>
                            <input type="text" name="firstName" id="reg-firstname" className="reg-firstname"
                                aria-required="true" tabindex="1" placeholder="" />
                            <label for="reg-lastname">Last name</label>
                            <input type="text"
                                name="lastName" id="reg-lastname" className="reg-lastname" aria-required="true" tabindex="1" placeholder="" /><label
                                    for="reg-email">Email</label><input type="text" name="session_key" className="reg-email" autocapitalize="off"
                                        tabindex="4" id="reg-email" autofocus="autofocus" /><label for="reg-password">Password (6 or more characters)</label><input
                                type="password" name="session_password" className="reg-password" id="reg-password" aria-required="true" tabindex="4"
                                autocomplete="new-password" /><span className="agreement">By clicking Join now, you agree to the LinkedIn
                                <a tabindex="4" href="https://www.linkedin.com/legal/user-agreement">User Agreement</a>,
                                <a tabindex="4" href="https://www.linkedin.com/legal/privacy-policy">Privacy Policy</a>, and
                                <a tabindex="4" href="https://www.linkedin.com/legal/cookie-policy">Cookie Policy</a>.</span><input tabindex="4"
                                id="registration-submit" className="registration submit-button" type="submit" value="Join now" />
                        </section>
                    </form>
                </div>
                <Loginfooter/>
            </div>
        )
    }
}

export default ApplicantSignup;