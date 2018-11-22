import {combineReducers} from 'redux';
import applicantProfile from './applicantProfileReducer';
import applicantErrorReducer from './applicantErrorReducer';


export default combineReducers({
    applicantProfile: applicantProfile,
    applicantErrorReducer:applicantErrorReducer

});