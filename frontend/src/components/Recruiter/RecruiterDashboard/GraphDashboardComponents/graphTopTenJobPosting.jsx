import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

export default class GraphTopTenJobPostingComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // recruiter: localStorage.getItem('recruiterToken')?jwtDecode(localStorage.getItem('recruiterToken')).email : "",
      chartData: {
        labels: ['Job 1', 'Job 2', 'Job 7', 'Job 9', 'Job 11','Job 13', 'Job `14', 'Job 17', 'Job 19', 'Job 21'],
        datasets: [
          {
            label:'Jobs',
            backgroundColor: 'rgba(106,183,255,0.6)',
            borderColor: 'rgba(30,126,229,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [55, 25, 35, 40, 29, 31, 34, 28, 32, 33]
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
          <h4 style={{ textAlign: "center" }}>Top 10 Job Posting</h4>

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
