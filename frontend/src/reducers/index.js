<<<<<<< HEAD
import { combineReducers } from "redux";
import applicantProfile from "./applicantProfileReducer";
import applicantErrorReducer from "./applicantErrorReducer";
import messageReducer from "./messagesReducer";

export default combineReducers({
  applicantProfile: applicantProfile,
  applicantErrorReducer: applicantErrorReducer,
  messageReducer: messageReducer
});
=======
import {combineReducers} from 'redux';
import applicantProfile from './applicantProfileReducer';
import recruiterProfile from './recruiterProfileReducer';
import applicantErrorReducer from './applicantErrorReducer';
import recruiterErrorReducer from './recruiterErrorReducer';


export default combineReducers({
    applicantProfile: applicantProfile,
    recruiterProfile: recruiterProfile,
    applicantErrorReducer:applicantErrorReducer,
    recruiterErrorReducer:recruiterErrorReducer

});
>>>>>>> f4800e38abfed8968f833f14f90aba4ca84ff7c3
