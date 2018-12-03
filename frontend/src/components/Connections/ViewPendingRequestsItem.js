import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import jwt_decode from "jwt-decode";

class ViewConnectionsItem extends Component {

  onAcceptClick() {
     //console.log('email on click',email)
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
        .post(`http://localhost:3001/applicants/acceptConnection/${this.email}`, requestEmail)
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
      <div className="row">

        <div className="col-1">
        
        </div>

        <div className="col-3">
        <h4>{ownerhome.requestFrom}</h4>
        </div>
        <div className="col-5">
        
        </div>
        <div className="col-2">
        <button 
                type="submit" 
                className="btn btn-primary"
             //  onClick={this.onConnectClick(profile.email).bind(this)} 
               onClick={this.onAcceptClick.bind(this)} 
                >
                    Accept
                </button>
        </div>
        <div className="col-1">
        
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
