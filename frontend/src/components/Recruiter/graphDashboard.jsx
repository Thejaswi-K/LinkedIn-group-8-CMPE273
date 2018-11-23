import React, { Component } from "react";

export default class GraphDashboardMain extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">graph 1</div>
          <div className="col-3">graph 2</div>
          <div className="col-3">graph 3</div>
        </div>
      </div>
    );
  }
}
