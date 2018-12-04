import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Messages from "./Messages";
import { CONSTANTS } from "./../../Constants";

class ViewConnectionsItem extends Component {
  onAcceptClick() {
    if (localStorage.getItem("applicantToken")) {
      let token = localStorage.getItem("applicantToken");
      this.decodedApplicant = jwt_decode(token);
      this.isApplicantLoggedIn = true;
      this.email = this.decodedApplicant.email;
      this.isRecruiter=this.decodedApplicant.isRecruiter;
      console.log("Emmail", this.email);
    }
    const requestEmail = {
      requestFrom: this.props.toEmail,
      recruiterLoggedin:this.isRecruiter,
      sendToRecruiter:this.props.sendTo
    };
    axios
      .post(
        `${CONSTANTS.BACKEND_URL}/applicants/acceptConnection/${this.email}`,
        requestEmail
      )
      .then(function(res) {
        if (res.data) {
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
                // margin: "50px",
                // marginRight: "10px",
                // padding: "40px",
                // paddingBottom: "100px",

                backgroundColor: "white",
                padding: "15px",
                borderRadius: "5px"
              }}
            >
              {/* <Messages membername={ownerhome.requestFrom} /> */}
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

ViewConnectionsItem.propTypes = {
  ownerhome: PropTypes.object.isRequired
};

export default ViewConnectionsItem;
