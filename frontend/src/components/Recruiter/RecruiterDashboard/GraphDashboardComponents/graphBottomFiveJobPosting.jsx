import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

export default class GraphBottomFiveJobPostingComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // recruiter: localStorage.getItem('recruiterToken')?jwtDecode(localStorage.getItem('recruiterToken')).email : "",
      chartData: {
        labels: ['Job 12', 'Job 21', 'Job 71', 'Job 19', 'Job 12'],
        datasets: [
          {
            label: "Jobs",
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [1, 5, 2, 3, 4]
          }
        ]
      }
    }
   
  }


  render() {
    return (
      <div>
        <div
          className="card"
          style={{
            borderRadius: "7px",
            margin: "5px"
          }}
        >
          <h4 style={{ textAlign: "center" }}>Bottom 5 job Posting</h4>

          <Bar
          data={this.state.chartData}
          width={100}
          height={100}
          options={
            {
          legend: {
              display: false
           },
           scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
          }
        }

        />
        </div>
      </div>
    );
  }
}
