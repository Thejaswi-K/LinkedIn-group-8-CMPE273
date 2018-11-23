import React, { Component } from "react";

export default class GraphDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // recruiter: localStorage.getItem('recruiterToken')?jwtDecode(localStorage.getItem('recruiterToken')).email : "",
      recruiter: "ag@gmail.com"
    };
  }
  render() {
    return (
      <div>
        <div
          className="card"
          style={{
            borderRadius: "7px",
            margin : "10px"
          }}
        >
          <h4 style={{textAlign:"center"}}>Metrics</h4>
          
        </div>
      </div>
    );
  }
}
