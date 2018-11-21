import React, {Component} from 'react';
import '../../App.css';
import {Link} from "react-router-dom";


class loginNavbar extends Component {

    render() {
        var loginOrOut;
        var profile;
        var signUp;
        var accountSettings;
        var requests;
        var connections;
        var home;
        var search;

        var navClassName;

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


        accountSettings = <li>
            <Link to="/" className="navbar-brand">
                <span
                    className="glyphicon glyphicon-cog navbar-icon" title="Settings">

                </span>
            </Link>
        </li>;

        requests =
            <li>
                <Link to="/" className="navbar-brand">
                    <span className='glyphicon glyphicon-bell navbar-icon' title="Requests">
            </span>
                </Link>
            </li>;

        connections = <li>
            <Link to="/" className="navbar-brand connections-icon">
                <span className='glyphicon glyphicon-apple' title="Connections">
                </span>
            </Link>
        </li>;

        home = <li> <Link to="/" className="navbar-brand ">
            <span className='glyphicon glyphicon-home navbar-icon' title="Home"/>
            <span className="w-50 my-text">Music</span>
        </Link></li>;

        search = <input className="form-control mr-sm-1" type="search" placeholder="Search" aria-label="Search"
                        style={{width: 120}}/>


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
                                <li className="nav-item active">
                                    {profile}
                                </li>
                                <li className="nav-item">
                                    {requests}
                                </li>
                                <li className="nav-item">
                                    {connections}
                                </li>
                                <li className="nav-item">
                                    {accountSettings}
                                </li>
                                <li className="nav-item">
                                    {loginOrOut}
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

            </div>


        )
    }

}

export default loginNavbar;