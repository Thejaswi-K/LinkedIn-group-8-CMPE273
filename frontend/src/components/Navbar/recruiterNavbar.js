import React, { Component } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { extractNameFromEmail, capitalizeFirstLetter } from "../../utility";
import jwtDecode from "jwt-decode";

class recruiterNavbar extends Component {
  constructor(props) {
    super();
    this.state = {
      isRecruiter: true,
      isLogged: true
      // isTraveler: jwtDecode(localStorage.getItem('token')).isTraveler
    };
    // this.notOwnerHandler = this.notOwnerHandler.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  //handle logout to destroy the cookie
  handleLogout = () => {
    let loggedInUser = capitalizeFirstLetter(
      extractNameFromEmail(
        jwtDecode(localStorage.getItem("recruiterToken")).email
      )
    );
    localStorage.removeItem("recruiterToken");
    // let user = {}
    // this.props.logoutData(false, user, true);
    this.setState = {
      ...this.state,
      isLogged: false
    };
    this.props.history.push("/");
    alert(`${loggedInUser} logged out successfully.`);
    console.log("User logged out Successfully.");
  };
  //  options = [
  //     'one', 'two', 'three'
  // ]
  searchProfile = () => {
    alert("I was clicked");
  };

  render() {
    var loginOrOut;
    var profile;
    var signUp;
    var accountSettings;
    var requests;
    var connections;
    var home;
    var search;
    var jobs;
    var navClassName;
    var messaging;

    var div;
    let userLogin = null;
    if (this.state.isRecruiter && this.state.isLogged) {
      console.log("Able to read session.");
      userLogin = (
        <div className="dropdown" tabindex="-1" role="presentation">
          <button
            style={{
              fontSize: "100%",
              color: "#fff",
              border: "none",
              paddingTop: "0px",
              fontWeight: "600"
            }}
            aria-haspopup="true"
            aria-expanded="false"
            className="site-header-nav__toggle Dropdown__toggle navbar navbar-expand-lg navbar-light bg-light"
            id="dropdownMenuButton"
            label="Login"
            data-toggle="dropdown"
          >
            {/* {this.props.userData.loginData.userFirstName.toUpperCase()}<span aria-hidden="true" className="caret"></span> */}
            <span className="glyphicon glyphicon-comment " />
            <div className="text-white">
              {capitalizeFirstLetter(
                extractNameFromEmail(
                  jwtDecode(localStorage.getItem("recruiterToken")).email
                )
              )}
              &nbsp;
              <span aria-hidden="true" className="caret" />
            </div>
          </button>
          <div className="dropdown-menu" aria-labelledby="site-header__login">
                  <ul style={{ padding: "0px" }}>
                      <li class="dropdown-item"><Link to="/recruiterDashboard"><span
                          className="glyphicon glyphicon-briefcase"></span>&nbsp;&nbsp;&nbsp;My Dashboard</Link>
                      </li>
                      <li class="dropdown-item"><Link to="/viewRecruiterPendingRequests"><span
                          className="glyphicon glyphicon-link"></span>&nbsp;&nbsp;&nbsp;My Requests</Link>
                      </li>
                      <li class="dropdown-item">
                          <Link to="/RecruiterSignup" onClick={this.handleLogout}>
                              <span className="glyphicon glyphicon-log-out" />
                              &nbsp;&nbsp;&nbsp;Logout
                        </Link>
                      </li>
                  </ul>
          </div>
        </div>
      );
    } else {
      console.log("unable to read session");
      userLogin = (
        <div id="login" className="dropdown" tabindex="-1" role="presentation">
          <button
            style={{
              fontSize: "1.6rem",
              color: "#fff",
              border: "none",
              paddingBottom: "18px",
              fontWeight: "600"
            }}
            aria-haspopup="true"
            aria-expanded="false"
            className="site-header-nav__toggle Dropdown__toggle "
            id="dropdownMenuButton"
            label="Login"
            data-toggle="dropdown"
          >
            Recruiter Login&nbsp;
            <span aria-hidden="true" className="caret" />
          </button>
          <div class="dropdown-menu" aria-labelledby="site-header__login">
            <ul style={{ padding: "0px" }}>
              <li class="dropdown-item">
                <Link to="/RecruiterSignup">
                  <span className="glyphicon glyphicon-log-in" />
                  &nbsp;&nbsp;&nbsp;Recruiter Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      );
    }
    //if the user is logged in, show the logout and profile link

    loginOrOut = (
      <li>
        <Link to="/logout" className="navbar-brand">
          <span
            className="glyphicon glyphicon-off navbar-icon"
            title="Logout"
          />
        </Link>
      </li>
    );

    profile = (
      <li>
        <Link to="/" title="Profile" className="navbar-brand">
          <span className="glyphicon glyphicon-user navbar-icon" />
        </Link>
      </li>
    );

    accountSettings = (
      <li className="drpdown">
        <Dropdown
          options={this.options}
          placeholder="Settings"
          className="drpdown"
        />
      </li>
    );

    requests = (
      <li>
        <Link to="/" className="navbar-brand">
          <span
            className="glyphicon glyphicon-bell navbar-icon"
            title="Requests"
          />
        </Link>
      </li>
    );

    connections = (
      <li>
        <Link
          to="/viewRecruiterConnections"
          className="navbar-brand connections-icon text-center text-white"
        >
          <span className="glyphicon glyphicon-globe " title="Connections" />
          <div className="text-white">My Network</div>
        </Link>
      </li>
    );

    home = (
      <li>
        <Link to="/recruiterprofileview" className="navbar-brand text-center text-white">
          <span className="glyphicon glyphicon-home navbar-icon" />
          <div className="text-white">Home</div>
        </Link>
      </li>
    );

    search = (
      <input
        className="form-control mr-sm-1 "
        type="search"
        placeholder="Search"
        aria-label="Search"
        style={{ width: 250, marginTop: 10 }}
      />
    );

    jobs = (
      <Link
        to="/jobSearch"
        className="navbar-brand connections-icon text-center text-white"
      >
        <span className="glyphicon glyphicon-briefcase " />
        <div className="text-white">Jobs</div>
      </Link>
    );

    messaging = (
      <Link
        to="/messagesRecruiter"
        className="navbar-brand connections-icon text-center text-white"
      >
        <span className="glyphicon glyphicon-comment " />
        <div className="text-white">Messaging</div>
      </Link>
    );

    navClassName = "navbar navbar-default navbar-static-top";

    return (
      <div>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-header row" style={{ marginLeft: 10 }}>
              <Link to="/" className="navbar-brand">
                <img
                  src="https://static.licdn.com/sc/h/95o6rrc5ws6mlw6wqzy0xgj7y"
                  alt="logo"
                />
              </Link>

              {search}
              <input
                style={{
                  fontSize: "100%",
                  weight: 300,
                  marginLeft: 25,
                  marginTop: 8,
                  marginBottom: 5,
                  color: "#fff"
                }}
                tabindex="1"
                id="login-submit"
                className="header wrapper login-form login submit-button"
                type="submit"
                value="Search"
                onClick={this.searchProfile.bind(this)}
              />
            </div>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav pull-right" style={{ marginRight: 67 }}>
                <li className="nav-item active">{home}</li>
                <li className="nav-item">{connections}</li>
                <li className="nav-item">{jobs}</li>
                <li className="nav-item">{messaging}</li>

                <li className="nav-item">{userLogin}</li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default recruiterNavbar;
