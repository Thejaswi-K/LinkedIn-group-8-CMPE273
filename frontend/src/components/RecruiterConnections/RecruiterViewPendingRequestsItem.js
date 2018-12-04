import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Messages from "./Messages";
import { CONSTANTS } from "../../Constants";

class RecruiterViewConnectionsItem extends Component {
  onAcceptClick() {
    if (localStorage.getItem("applicantToken")) {
      let token = localStorage.getItem("applicantToken");
      this.decodedApplicant = jwt_decode(token);
      this.isApplicantLoggedIn = true;
      this.email = this.decodedApplicant.email;
      console.log("Emmail", this.email);
    }
    const requestEmail = {
      requestFrom: this.props.toEmail
    };
    axios
      .post(
        `${CONSTANTS.BACKEND_URL}/recruiters/acceptConnection/${this.email}`,
        requestEmail
      )
      .then(function(res) {
        if (res.data) {
          //create connection in Graph


          alert("Connection Accepted Successfully");

          window.location.reload();
        }
      });
  }
  render() {
    const { ownerhome } = this.props;

    return (
      <div className="container">
        <div className="row" style={{ height: "50px", marginTop: "5px" }}>
          <div className="col-7">
            <div
              className="card"
              style={{
                backgroundColor: "white",
                padding: "15px",
                borderRadius: "5px"
              }}
            >
              {ownerhome.requestFrom}
            </div>
          </div>

          <div className="col-5">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.onAcceptClick.bind(this)}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    );
  }
}

RecruiterViewConnectionsItem.propTypes = {
  ownerhome: PropTypes.object.isRequired
};

export default RecruiterViewConnectionsItem;
