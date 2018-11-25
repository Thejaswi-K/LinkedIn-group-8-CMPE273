import React, { Component } from "react";
import axios from "axios";

// REDUX functionality
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// import Pagination from "../common/pagination";
// import { paginate } from "../../utils/paginate";
import { messageViewFunc } from "../../../actions/messageActions";

class messageView extends Component {
  lookprop = [];
  constructor(props) {
    super(props);
    this.state = {
      authflag: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messageReducer.message_byID !== []) {
      var data = {
        from_email: this.props.messageReducer.message_byID[0],
        to_email: this.props.messageReducer.message_byID[1]
      };
      this.props.messageViewFunc(data);
    }
  }

  componentDidMount() {
    var data = {
      from_email: this.props.messageReducer.message_byID[0],
      to_email: this.props.messageReducer.message_byID[1]
    };
    this.props.messageViewFunc(data);
  }

  render() {
    return (
      <div>
        <br />
        <ul>
          <div class="panel panel-default">
            <div class="panel-heading">
              <div class="checklist-header-container ">
                <h1>
                  <span>
                    <b>Messages</b>
                  </span>
                </h1>
              </div>
            </div>
            <div class="panel-body">
              <div
                style={{
                  height: "400px",
                  width: "1000px",
                  border: "1px",
                  overflow: "auto"
                }}
              >
                {this.props.messageReducer.messageView.map((propval, place) => (
                  <div className="ml-5 mt-2">
                    {/* {propval.messageMembers[1]} */}
                    <b>{propval.author}:</b>
                    <br />
                    {propval.message}
                    <br />
                    <hr />
                  </div>
                ))}

                <br />
              </div>
            </div>
            <br />
            <div>
              <h6>
                <textarea
                  placeholder="Write Something ... !!"
                  style={{
                    width: "1000px",
                    height: "100px",
                    marginLeft: "10px"
                  }}
                />
              </h6>
              <br />
              <button class="btn btn-lg btn-primary "> Send</button>
            </div>
          </div>
        </ul>
      </div>
    );
  }
}

messageView.propTypes = {
  messageViewFunc: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  messageReducer: state.messageReducer
});

export default connect(
  mapStateToProps,
  { messageViewFunc }
)(withRouter(messageView));
