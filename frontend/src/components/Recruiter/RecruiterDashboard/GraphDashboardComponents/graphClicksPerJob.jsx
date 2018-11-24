import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

export default class GraphClicksPerJobComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // recruiter: localStorage.getItem('recruiterToken')?jwtDecode(localStorage.getItem('recruiterToken')).email : "",
      chartData: {
        labels: ['Job 1', 'Job 2', 'Job 7', 'Job 9', 'Job 22', 'Job 40', 'Job 41'],
        datasets: [
          {
            
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40, 22]
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
          <h4 style={{ textAlign: "center" }}>Clicks Per Job posting</h4>

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
