import { combineReducers } from "redux";
import applicantProfile from "./applicantProfileReducer";
import applicantErrorReducer from "./applicantErrorReducer";
import messageReducer from "./messagesReducer";

export default combineReducers({
  applicantProfile: applicantProfile,
  applicantErrorReducer: applicantErrorReducer,
  messageReducer: messageReducer
});
