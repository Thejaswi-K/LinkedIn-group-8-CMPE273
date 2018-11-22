import React, { Component } from "react";
import Messages from "./Messages";
import axios from "axios";
import { Redirect } from "react-router";
import MessageView from "./messageView";

class messageList extends Component {
  lookprop = [];
  constructor(props) {
    super(props);
    this.state = {
      authflag: false,
      isClicked: false
    };
  }

  redirectDetails = members => {
    this.setState({
      ...this.state,
      isClicked: true
    });
  };

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
    var redirect;
    if (this.state.isClicked) {
      redirect = <MessageView />;
    }
    return (
      <div>
        <div class="content-panel-container">
          <div class="panel panel-default">
            <div className="col-sm-3">
              <ul className="nav nav-navs" id="myTab" role="tablist">
                {this.lookprop.map((propval, place) => (
                  <li className="nav-item">
                    <a data-toggle="tab" href="#location">
                      <div className="ml-5 mt-2">
                        <Messages
                          membername={propval.messageMembers[1]}
                          from_email={propval.authorMessage[place].author}
                          onClick={() =>
                            this.redirectDetails(propval.messageMembers)
                          }
                        />
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-sm-9">
              <div className="tab-content">
                <div className="tab-pane fade in" id="location" role="tabpanel">
                  {redirect}
                  {/* {(this.state.isClicked) ? <MessageView /> : } */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default messageList;
