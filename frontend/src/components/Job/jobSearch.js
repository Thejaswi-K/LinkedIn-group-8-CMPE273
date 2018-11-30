import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import ProfileNavbar from "../Navbar/applicantNavbar";

class Home extends Component {
  constructor(props) {
    super(props);
    this.changeJobName = this.changeJobName.bind(this);
    this.changeJobLocation = this.changeJobLocation.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);

    this.state = {
      jobname: "",
      joblocation: "",
      messagediv: "",
      authFlag: false
    };
  }

  changeJobName = e => {
    this.setState({
      jobname: e.target.value
    });
  };

  changeJobLocation = e => {
    this.setState({
      joblocation: e.target.value
    });
  };

  searchSubmit = e => {
    e.preventDefault();
    this.setState({
      authFlag: true
    });
    sessionStorage.setItem("jobname", this.state.jobname);
    sessionStorage.setItem("joblocation", this.state.joblocation);
  };

  render() {
    let redirect = null;
    if (this.state.authFlag) {
      redirect = <Redirect to="/jobList" />;
    }
    return (
      <div
        style={{
          height: "640px",
          backgroundImage:
            "url('https://static.licdn.com/sc/h/64xk850n3a8uzse6fi11l3vmz')"
        }}
      >
        {redirect}
        <ProfileNavbar />
        <div class="col-md-5" style={{ top: "250px", left: "60px" }}>
          <div class="form-group form-group-lg form-group-icon-left">
            <input
              class="form-control"
              placeholder="Search jobs"
              type="text"
              name="jobname"
              onChange={this.changeJobName}
              id="jobname"
            />
          </div>
        </div>

        <div class="col-md-4" style={{ top: "250px", left: "60px" }}>
          <div class="form-group form-group-lg form-group-icon-left">
            <input
              class="form-control"
              placeholder="Search location"
              type="text"
              name="location"
              onChange={this.changeJobLocation}
              id="location"
            />
          </div>
        </div>

        <div class="col-md-2" style={{ top: "250px", left: "60px" }}>
          <div class="hotel-search-button">
            <button
              type="submit"
              onClick={this.searchSubmit}
              class="btn btn-primary btn-lg btn-block"
              value=""
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
