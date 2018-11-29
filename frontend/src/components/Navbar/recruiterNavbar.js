import React, {Component} from 'react';
import '../../App.css';
import {Link} from "react-router-dom";


class recruiterNavbar extends Component {

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
        var jobsPosting;

        var div;


        //if the user is logged in, show the logout and profile link

        loginOrOut =
            <li>
                <Link to="/logout" className="navbar-brand"><span className="glyphicon glyphicon-off navbar-icon"
                                                                  title="Logout">

                </span>
                </Link>
            </li>;

        profile = <li>
            <Link to="/" title="Profile" className="navbar-brand">
                <span
                    className="glyphicon glyphicon-user navbar-icon"
                />
            </Link>
        </li>;


        accountSettings = <li className="dropdown">
            <a className="navbar-brand text-center text-white ">
                <span
                    className="glyphicon glyphicon-cog navbar-icon" title="Settings">

                </span>
                <div className="text-white">Settings</div>
            </a>
            <ul className="dropdown-menu">
                <li><a href="#">Yes</a></li>
                <li><a href="#">No</a></li>
            </ul>
        </li>;

        requests =
            <li>
                <Link to="/" className="navbar-brand">
                    <span className='glyphicon glyphicon-bell navbar-icon' title="Requests">
            </span>
                </Link>
            </li>;

        connections = <li>

            <Link to="/" className="navbar-brand connections-icon text-center text-white">
                <span className='glyphicon glyphicon-globe ' title="Connections">
                </span>
                <div className="text-white">My Network</div>
            </Link>
        </li>;

        home = <li><Link to="/" className="navbar-brand text-center text-white">
            <span className='glyphicon glyphicon-home navbar-icon'/>
            <div className="text-white">Home</div>
        </Link></li>;

        search = <input className="form-control mr-sm-1 " type="search" placeholder="Search" aria-label="Search"
                        style={{width: 120}}/>;

        jobs = <Link to="/" className="navbar-brand connections-icon text-center text-white">
                <span className='glyphicon glyphicon-briefcase '>
                </span>
            <div className="text-white">Add a job</div>
        </Link>;

        jobsPosting = <Link to="/" className="navbar-brand connections-icon text-center text-white">
                <span className='glyphicon glyphicon-briefcase '>
                </span>
            <div className="text-white">Job Posting</div>
        </Link>;

        messaging = <Link to="/" className="navbar-brand connections-icon text-center text-white">
                <span className='glyphicon glyphicon-comment '>
                </span>
            <div className="text-white">Connections</div>
        </Link>;


        navClassName = "navbar navbar-default navbar-static-top";

        return (

            <div>


                <div>

                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="navbar-header">
                            <Link to="/" className="navbar-brand">
                                <img src="https://static.licdn.com/sc/h/95o6rrc5ws6mlw6wqzy0xgj7y" alt="logo"
                                />
                            </Link>

                            {search}
                        </div>

                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav pull-right">
                                <li className="nav-item active">
                                    {home}
                                </li>

                                <li className="nav-item">
                                    {jobs}
                                </li>
                                <li className="nav-item">
                                    {jobsPosting}
                                </li>

                                <li className="nav-item">
                                    {connections}
                                </li>
                                <li className="nav-item">
                                    {messaging}
                                </li>

                                <li className="nav-item">
                                    {accountSettings}
                                </li>

                            </ul>
                        </div>
                    </nav>
                </div>

            </div>


        )
    }

}

export default recruiterNavbar;