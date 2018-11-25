
import messageReducer from "./messagesReducer";
import {combineReducers} from 'redux';
import applicantProfile from './applicantProfileReducer';
import recruiterProfile from './recruiterProfileReducer';
import applicantErrorReducer from './applicantErrorReducer';
import recruiterErrorReducer from './recruiterErrorReducer';
import photosReducer from './photosReducer';


export default combineReducers({
    applicantProfile: applicantProfile,
    recruiterProfile: recruiterProfile,
    applicantErrorReducer:applicantErrorReducer,
    recruiterErrorReducer:recruiterErrorReducer,
    photos: photosReducer,
    messageReducer: messageReducer

});
