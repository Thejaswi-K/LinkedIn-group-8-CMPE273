import React, { Component } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { CONSTANTS } from "../../../Constants";


export default class JobStats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // recruiter: localStorage.getItem('recruiterToken')?jwtDecode(localStorage.getItem('recruiterToken')).email : "",
      recruiter: "recruiter1@gmail.com",
      joblist: ""
    };
  }

  componentDidMount() {
    console.log("Recruiter is ", this.state.recruiter);
    axios
      .get(
        `${CONSTANTS.BACKEND_URL}/recruiters/` + this.state.recruiter + "/jobs"
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          joblist: response.data.jobsList.data
        });
      })
      .catch(function(error) {
        console.log("errored in component did mount jobListing");
        console.log(error);
      });
  }
  buttonEdit = e => {
    e.preventDefault();
    this.props.history.push({
      pathname: "/editJob",
      state: e.target.value
    });
  };
  buttonView = e => {
    e.preventDefault();
    this.props.history.push({
      pathname: "/jobApplicantsDetails",
      state: e.target.value
    });
  };
  render() {
    //    var propertylist = ();

    //console.log(plist);
    var allImgs = Array.prototype.slice.call(this.state.joblist);

    //var resu = allImgs.map(p=>p.propertyName);

    //console.log("result is", resu);

    return (
      <div>
        <div
          className="card"
          style={{
            margin: "50px",
            marginRight: "10px",
            padding: "40px",
            paddingBottom: "100px",
            backgroundColor: "#FAFAFA",
            borderRadius: "40px"
          }}
        >
          <h4 style={{ marginLeft: "50px", marginTop: "40px" }}>
            Jobs listed
          </h4>
          {allImgs.map((job, i) => (
            <div
              className="card"
              style={{
                margin: "10px",
                marginLeft: "50px",
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
                style={{ margin: "10px" }}
              >
                <li
                  className="list-group-item"
                  key={i}
                  style={{ margin: "10px" }}
                >
                  <div className="card-body">
                    <h4>{job.title}</h4>

                    <dl className="form-row">
                      <dl className="col-sm-7">
                        <dt className="col-sm-3">Description :</dt>
                        <dd className="col-sm-9"> {job.description}</dd>
                        <dt className="col-sm-3">Location :</dt>
                        <dd className="col-sm-9"> {job.location}</dd>
                        <dt className="col-sm-3">Industry :</dt>
                        <dd className="col-sm-9"> {job.industry}</dd>
                      </dl>

                      <dl className="col-sm-2">
                        <dl className="row">
                          <button
                            className="btn btn-primary"
                            style={{ margin: "2px", width: "7rem" }}
                            value={job._id}
                            onClick={this.buttonEdit}
                            type="button"
                          >
                            Edit
                          </button>
                        </dl>
                        <dl className="row">
                          <button
                            className="btn btn-primary"
                            style={{ margin: "2px", width: "7rem" }}
                            value={job._id}
                            onClick={this.buttonView}
                            type="button"
                          >
                            View
                          </button>
                        </dl>
                      </dl>
                      <dl className="col-sm-3">
                        <label style={{ fontSize: "160%", color: "Blue" }}>
                          {job.noOfApplicants}
                        </label>
                        <label
                          style={{
                            fontFamily: "Helvetica",
                            marginInlineStart: "4px",
                            fontStyle: "italic",
                            fontSize: "90%",
                            color: "Grey"
                          }}
                        >
                          Applicants
                        </label>
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
