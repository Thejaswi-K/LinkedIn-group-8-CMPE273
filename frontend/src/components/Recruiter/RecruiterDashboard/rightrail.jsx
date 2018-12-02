import React, { Component } from "react";
import axios from 'axios';
import {CONSTANTS} from '../../../Constants';


export default class RightRailComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // recruiter: localStorage.getItem('recruiterToken')?jwtDecode(localStorage.getItem('recruiterToken')).email : "",
      recruiter: "testrecruiter@gmail.com",
      recruiterData : ""
    };
  }
componentDidMount(){
  axios.defaults.withCredentials = true;

  axios
  .get(`${CONSTANTS.BACKEND_URL}/recruiters/` + this.state.recruiter)
  .then(response => {
    console.log(response.data);
    this.setState({
      recruiterData: response.data
    });
  }) 
  .catch(function(error) {
    console.log("errored");
    console.log(error);
  });


}
  render() {
    return (
      <div>
        <div
          className="card"
          style={{
            borderRadius: "7px",
            margin : "10px",
            boxShadow:
                  "0 1px 5px 1px rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
          }}
        >

          <ul
                className="list-group list-group-flush"
                style={{ margin: "10px" }}
              >
                <li
                  className="list-group-item"
                  // key={i}
                  style={{ margin: "10px" }}
                >
                  <div className="card-body">
                    <h4>Recruiter Name and username</h4>
                    <dl class="row">
                  
                  <dt class="col-sm-5">First Name :</dt>
                  <dd class="col-sm-7"> firstname</dd>
                  <dt class="col-sm-5">Last Name :</dt>
                  <dd class="col-sm-7"> lastname</dd>
                  <dt class="col-sm-5">Email :</dt>
                  <dd class="col-sm-7"> emailid</dd>
                  <dt class="col-sm-5">Company</dt>
                  <dd class="col-sm-7">company </dd>
                  <dt class="col-sm-5">Location:</dt>
                  <dd class="col-sm-7"> Location</dd>
                  </dl>

                  </div>
                </li>
              </ul>
        </div>
      </div>
    );
  }
}
