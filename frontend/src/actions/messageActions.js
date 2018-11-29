import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import { CONSTANTS } from "../Constants";
import {
  MESSAGE_LIST,
  GET_MESSAGE_ERRORS,
  MESSAGE_DETAILS_BY_ID,
  MESSAGE_VIEW,
  SEND_MESSAGE
} from "./types";

const ROOT_URL = "http://LinkedIn-Backend-1636541959.us-west-1.elb.amazonaws.com:3001";

export const messageListFunc = applicantEmail => dispatch => {
  axios.defaults.withCredentials = true;
  //   setAuthToken(localStorage.getItem("applicantToken"));
  axios
    .get(`${ROOT_URL}/applicants/applicantMessages`, {
      params: { from_email: applicantEmail }
    })
    .then(res =>
      dispatch({
        type: MESSAGE_LIST,
        payload: res.data
      })
    )
    .catch(errors =>
      dispatch({
        type: GET_MESSAGE_ERRORS,
        payload: errors
      })
    );
};

/*************************Message Member Name and Email Id on Click ********************* */

export const messageID = messageByID => async dispatch => {
  console.log("Inside each message details");
  console.log(messageByID);
  dispatch({
    type: MESSAGE_DETAILS_BY_ID,
    payload: messageByID
  });
};

/****************Each Message Details ************* */

export const messageViewFunc = receiverDetails => dispatch => {
  axios.defaults.withCredentials = true;
  //   setAuthToken(localStorage.getItem("applicantToken"));
  axios
    .get(`${ROOT_URL}/applicants/receiveMessage`, {
      params: {
        from_email: receiverDetails.from_email,
        to_email: receiverDetails.to_email
      }
    })
    .then(res =>
      dispatch({
        type: MESSAGE_VIEW,
        payload: res.data.authorMessage
      })
    )
    .catch(errors =>
      dispatch({
        type: GET_MESSAGE_ERRORS,
        payload: errors
      })
    );
};

/*********Sending messsages between the people ********** */

export const sendMessageFunc = sendMessageDetails => dispatch => {
  axios.defaults.withCredentials = true;
  //   setAuthToken(localStorage.getItem("applicantToken"));
  axios
    .post(`${ROOT_URL}/applicants/sendMessage`, sendMessageDetails)
    .then(res =>
      dispatch({
        type: SEND_MESSAGE,
        payload: res.data
      })
    )
    .catch(errors =>
      dispatch({
        type: GET_MESSAGE_ERRORS,
        payload: errors
      })
    );
};
