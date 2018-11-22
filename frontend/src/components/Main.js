import React, { Component } from "react";
import { Route } from "react-router-dom";
import MessageList from "./Applicant/Messages/messageList";
import MessageView from "./Applicant/Messages/messageView";

import { Redirect } from "react-router";

class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        {/* <Route path="/" component={MessageList} /> */}
        <Route path="/applicants/applicantMessages" component={MessageList} />
        <Route path="/applicantMessageView" component={MessageView} />
      </div>
    );
  }
}
//Export The Main Component
export default Main;
