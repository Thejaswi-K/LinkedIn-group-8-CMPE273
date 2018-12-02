import React, { Component } from "react";
import ProfileNavbar from "../Navbar/applicantNavbar";
// import axios from "axios";
import JobCard from "./JobCard";
import { Redirect } from "react-router";

import { connect } from "react-redux";
import { jobSearchFunc, jobDetalsByID } from "../../actions/jobSearchActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";

class jobList extends Component {
  lookprop = [];
  jobDetails = [];
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageSize: 50,
      isClicked: false,
      isRes: false,
      authflag: false
    };
  }

  redirectDetails = jobID => {
    this.props.jobDetalsByID(jobID);
    this.props.history.push("/jobDetails")
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.jobSearchReducer.jobSearchDetails.data != null) {
      this.jobDetails = nextProps.jobSearchReducer.jobSearchDetails.data;
      if (this.jobDetails.length > 0) {
        this.setState({
          ...this.state,
          isRes: true
        });
      }
    }
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  componentDidMount() {
    var data = {
      jobname: sessionStorage.getItem("jobname"),
      joblocation: sessionStorage.getItem("joblocation")
    };
    this.props.jobSearchFunc(data);
  }

  render() {
    var { length: count } = this.jobDetails;
    console.log(count);
    const { pageSize, currentPage } = this.state;
    const jobs = paginate(this.jobDetails, currentPage, pageSize);

    let redirect = null;
   

    return (
      <div>
        {redirect}
        <ProfileNavbar />
        <h3>
          {" "}
          Showing {count} jobs in the database, according to your search,
          {"   "}
          {this.props.applicantProfile.applicantProfile.firstname}:{" "}
        </h3>
        {jobs.map((propval, place) => (
          <div className="ml-5 mt-2">
            <JobCard
              title={propval.title}
              description={propval.description}
              onClick={() => this.redirectDetails(propval._id)}
              //   headline={propval.headline}
              //   description={propval.description}
              //   property_type={propval.property_type}
              //   bedrooms={propval.bedrooms}
              //   bathrooms={propval.bathrooms}
              //   accomodates={propval.accomodates}
              //   currtype={propval.currtype}
              //   dailyrate={propval.dailyrate}
            />
          </div>
        ))}
        <div className="col-sm-12">
          <Pagination
            itemsCount={count}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

jobList.propTypes = {
  jobSearchFunc: PropTypes.func.isRequired,
  jobDetalsByID: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  jobSearchReducer: state.jobSearchReducer,
  applicantProfile: state.applicantProfile
});

export default connect(
  mapStateToProps,
  { jobSearchFunc, jobDetalsByID }
)(withRouter(jobList));
