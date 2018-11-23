import React, { Component } from "react";

export default class RightRailComponent extends Component {
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
            margin : "10px",
            boxShadow:
                  "0 1px 5px 1px rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
          }}
        >
          <h4>Right Rail</h4>
        </div>
      </div>
    );
  }
}
