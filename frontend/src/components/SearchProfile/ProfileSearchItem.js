import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import jwt_decode from "jwt-decode";


class ProfileSearchItem extends Component {

    onConnectClick() {
      //  console.log('email on click',email)
        if (localStorage.getItem("applicantToken")) {
            let token = localStorage.getItem("applicantToken");
            this.decodedApplicant = jwt_decode(token);
            this.isApplicantLoggedIn = true;
            this.email = this.decodedApplicant.email;
            console.log("Emmail", this.email)
        }
        const requestEmail={
            requestFrom:this.email
        }
        axios
          .post(`http://localhost:3001/applicants/connections/${this.props.toEmail}`, requestEmail)
          .then(function(res) { 
              if (res.data) {
                alert("Connection Sent Successfully")
                
              } 
    })
          
    }
    

  render() {
    const { profile } = this.props;

    return (
      
      <div className="card card-body bg-light mb-3">
      <div className="row">

        <div className="col-1">
        
        </div>

        <div className="col-3">
        <h3>{profile.firstName} {profile.lastName}</h3>
        <h5>{profile.city} {profile.state}</h5>
        </div>
        <div className="col-4">
        
        </div>
        <div className="col-3">
            <div className="text-right">
                <button 
                type="submit" 
                className="btn btn-primary"
             //  onClick={this.onConnectClick(profile.email).bind(this)} 
               onClick={this.onConnectClick.bind(this)} 
                >
                    Connect
                </button>
            </div>
            <br/>
            <div className="text-right">
                <button type="submit" className="btn btn-primary">
                    Message
                </button>
            </div>
        </div>
        <div className="col-1">
        
        </div>
        
      </div>
    </div>
      
    );
  }
}

ProfileSearchItem.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileSearchItem;
