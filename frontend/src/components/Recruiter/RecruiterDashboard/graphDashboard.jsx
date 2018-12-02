import React, { Component } from "react";
import GraphClicksPerJobComponent from './GraphDashboardComponents/graphClicksPerJob';
import GraphNumberofSavedJobComponent from './GraphDashboardComponents/graphNumberOfSavedJob';
import GraphTopTenJobPostingComponent from './GraphDashboardComponents/graphTopTenJobPosting';
import GraphCityWiseComponent from './GraphDashboardComponents/graphCityWise';
import GraphBottomFiveJobPostingComponent from './GraphDashboardComponents/graphBottomFiveJobPosting';

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
          <div className="col-3">
          {/* <GraphTopTenJobPostingComponent/> */}
          </div>
        </div>
        <div className="row">
          <div className="col-3">
          <GraphCityWiseComponent/></div>
          <div className="col-3">
          <GraphBottomFiveJobPostingComponent/></div>
          <div className="col-3">graph 6</div>
        </div>
        <div>
        <GraphTopTenJobPostingComponent/>
        </div>
      
      </div>
    );
  }
}
