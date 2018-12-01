import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

export default class GraphTopTenJobPostingComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // recruiter: localStorage.getItem('recruiterToken')?jwtDecode(localStorage.getItem('recruiterToken')).email : "",
      chartData: {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August','September', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label:'Job1',
            backgroundColor: 'blue',
            data: [55, 25, 35, 40, 29, 31, 34, 28, 32, 33,12,10]
          },
          {
            label:'Job2',
            backgroundColor: 'yellow',
            data: [15, 15, 25, 40, 26, 1, 4, 8, 32, 33,12,10]
          },
          {
            label:'Job3',
            backgroundColor: 'red',
            data: [54, 22, 34, 40, 65, 11, 24, 8, 3, 3,2,10]
          },
          {
            label:'Job4',
            backgroundColor: 'grey',
            data: [12, 12, 4, 34, 34, 2, 34, 28, 32, 33,12,10]
          },
          {
            label:'Job5',
            backgroundColor: 'black',
            data: [55, 25, 35, 40, 29, 31, 34, 28, 32, 33,12,10]
          },
          {
            label:'Job6',
            backgroundColor: 'purple',
            data: [55, 25, 35, 40, 29, 31, 34, 28, 32, 33,12,10]
          },
          {
            label:'Job7',
            backgroundColor: 'orange',
            data: [55, 25, 35, 40, 29, 31, 34, 28, 32, 33,12,10]
          },
          {
            label:'Job8',
            backgroundColor: 'darkblue',
            data: [55, 25, 35, 40, 29, 31, 34, 28, 32, 33,12,10]
          },
          {
            label:'Job9',
            backgroundColor: 'cyan',
            data: [55, 25, 35, 40, 29, 31, 34, 28, 32, 33,12,10]
          },
          {
            label:'Job10',
            backgroundColor: 'green',
            data: [55, 25, 35, 40, 29, 31, 34, 28, 32, 33,12,10]
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
