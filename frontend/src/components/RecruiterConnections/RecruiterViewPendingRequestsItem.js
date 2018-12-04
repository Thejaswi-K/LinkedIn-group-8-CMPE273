import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import Messages from "./Messages";
import {CONSTANTS} from "../../Constants"


class RecruiterViewConnectionsItem extends Component {

  onAcceptClick() {
      if (localStorage.getItem("applicantToken")) {
          let token = localStorage.getItem("applicantToken");
          this.decodedApplicant = jwt_decode(token);
          this.isApplicantLoggedIn = true;
          this.email = this.decodedApplicant.email;
          console.log("Emmail", this.email)
      }
      const requestEmail={
          requestFrom:this.props.toEmail
      }
      axios
        .post(`${CONSTANTS.BACKEND_URL}/recruiters/acceptConnection/${this.email}`, requestEmail)
        .then(function(res) { 
            if (res.data) {
              alert("Connection Accepted Successfully")
              window.location.reload();
              
            } 
  })
        
  }
  render() {
    const { ownerhome } = this.props;

    return (
      
      <div className="card card-body bg-light mb-3">
      <Messages membername={ownerhome.requestFrom} />
       <button 
                type="submit" 
                className="btn btn-primary"
                onClick={this.onAcceptClick.bind(this)} 
                >
                    Accept
                </button>
    </div>
      
    );
  }
}

RecruiterViewConnectionsItem.propTypes = {
  ownerhome: PropTypes.object.isRequired
};

export default RecruiterViewConnectionsItem;
