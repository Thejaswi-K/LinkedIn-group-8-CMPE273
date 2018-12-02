import React, { Component } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {usaDateFormat} from '../../../utility';
import { CONSTANTS } from "../../../Constants";


export default class JobListingComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // recruiter: localStorage.getItem('recruiterToken')?jwtDecode(localStorage.getItem('recruiterToken')).email : "",
      recruiter: "recruiter1@gmail.com",
      jobId : this.props.jobid,
      jobData: ""
    };
  }

  componentDidMount() {
    console.log("Recruiter is ", this.state.recruiter);
    axios
      .get(`${CONSTANTS.BACKEND_URL}/jobs/`+this.props.jobId)
      .then(response => {
        console.log("Inside JobStats response data in component didmount:",response.data.data[0].jobApplications[0]);
        this.setState({
          jobData: response.data.data[0].jobApplications
        });
      })
      .catch(function(error) {
        console.log("errored in component did mount jobStats");
        console.log(error);
      });
  }
  buttonViewResume = e => {
    e.preventDefault();
    this.props.history.push({
      pathname: "/jobApplicantsDetails",
      state: e.target.value
    });
  };
  render() {
    console.log("Inside JobStats, jOb Id: ", this.props.jobId)
    var allImgs = Array.prototype.slice.call(this.state.jobData);
    return (
      <div>
        <div
          className="card"
          style={{
            // margin: "50px",
            // marginRight: "10px",
            // padding: "40px",
            // paddingBottom: "100px",
            marginTop: "2rem",
            backgroundColor: "#FAFAFA",
            borderRadius: "10px"
          }}
        >

        <h1 data-test-post-page-title="" className="jobs__main-title" style={{ marginLeft: "5rem", marginTop: "3rem" , marginBottom:"2rem"}}>
                <b><span style={{ fontSize: "120%", color: "#006097" }}>{this.state.jobData.length}</span> Applicants Applied for the this Job</b>
            </h1>
          {/* <h4 style={{ marginLeft: "5rem", marginTop: "7rem" }}>
            Jobs listed
          </h4> */}
          {allImgs.map((job, i) => (
            <div
              className="card"
              style={{
                 marginLeft: "3rem",
                 marginRight:"3rem",
                 marginBottom: "1rem",
                //  marginLeft: "3rem",
                 borderRadius: "10px",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
              }}
            >
              {" "}
              {/* <div class="card-header border-0">
                <img class="card-img-top" src={job.companyLogo} alt="Company Logo" />
              </div> */}
              <ul
                className="list-group list-group-flush"
                style={{ margin: "5px" }}
              >
                <li
                  className="list-group-item"
                  key={i}
                  style={{ margin: "10px" }}
                >
                  <div className="card-body">
                    <h4 style={{fontSize: "120%", color: "#006097"}}>{job.applicant_id}</h4>

                    <dl className="form-row">
                      <dl className="col-sm-7">
                        <dt className="col-sm-4">First Name :</dt>
                        <dd className="col-sm-8"> {job.firstName}</dd>
                        <dt className="col-sm-4">Last Name :</dt>
                        <dd className="col-sm-8"> {job.lastName}</dd>
                        <dt className="col-sm-4">Applied On :</dt>
                        <dd className="col-sm-8"> {usaDateFormat(job.appliedOn)}</dd>
                      </dl>

                      <dl className="col-sm-3">
                        <dl className="row">
                          <button
                            className="btn btn-primary"
                            style={{ margin: "1px", width: "13rem", fontWeight:"600" }}
                            value={job._id}
                            onClick={this.buttonViewResume}
                            type="button"
                          >
                            View Resume
                          </button>
                        </dl>
                      </dl>
                    </dl>
                  </div>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
