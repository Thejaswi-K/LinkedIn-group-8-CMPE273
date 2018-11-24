import React, { Component } from "react";
import GraphClicksPerJobComponent from './GraphDashboardComponents/graphClicksPerJob';
import GraphNumberofSavedJobComponent from './GraphDashboardComponents/graphNumberOfSavedJob';

export default class GraphDashboardMain extends Component {
  render() {
    return (
      <div >
        <div className="row">
          <div className="col-3">
          <GraphClicksPerJobComponent/>
          </div>
          <div className="col-3">
          <GraphNumberofSavedJobComponent/></div>
          <div className="col-3">graph 3</div>
        </div>
        <div className="row">
          <div className="col-3">graph 4</div>
          <div className="col-3">graph 5</div>
          <div className="col-3">graph 6</div>
        </div>
      
      </div>
    );
  }
}
