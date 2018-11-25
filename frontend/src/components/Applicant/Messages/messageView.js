import React, { Component } from "react";
import axios from "axios";

class messageView extends Component {
  lookprop = [];
  constructor(props) {
    super(props);
    this.state = {
      authflag: false
    };
  }
  componentDidMount() {
    var data = {
      from_email: "apurav@gmail.com"
    };
    axios
      .get("http://localhost:3001/applicants/applicantMessages", {
        params: data
      })
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          console.log(response.data[0].authorMessage.message);

          this.lookprop = response.data;
          this.setState({
            ...this.state,
            authflag: true
          });
        } else {
          this.setState({
            ...this.state,
            authflag: false
          });
        }
      });
  }

  render() {
    return (
      <div>
        <ul>
          {this.lookprop.map((propval, place) => (
            <div className="ml-5 mt-2">
              {/* {propval.messageMembers[1]} */}
              <br />
              {propval.authorMessage.map((memval, index) => (
                <div>
                  <b>{memval.author}:</b>
                  <br />
                  {memval.message}
                </div>
              ))}
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default messageView;
