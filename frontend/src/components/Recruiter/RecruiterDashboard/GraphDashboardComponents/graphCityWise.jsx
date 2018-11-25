import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

export default class GraphCityWiseComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // recruiter: localStorage.getItem('recruiterToken')?jwtDecode(localStorage.getItem('recruiterToken')).email : "",
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May','June','July', 'August', 'September','October', 'November', 'December'],
        datasets: [
          {
            
            backgroundColor: 'rgba(106,183,255,0.6)',
            borderColor: 'rgba(30,126,229,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [5, 5, 8, 1, 5, 15, 40, 2,10,2,12,55]
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
          <h4 style={{ textAlign: "center" }}>City Wise Application/month</h4>

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
             xAxes:[{
               ticks:{
                autoSkip:false
               }
             }],
              yAxes: [{
                  ticks: {
                      beginAtZero:true,

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
