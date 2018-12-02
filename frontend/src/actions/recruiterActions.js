import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {CONSTANTS} from '../Constants';

import {
    RECRUITER_PROFILE,
    RECRUITER_GET_ERRORS,
    SET_RECRUITER_CURRENT_USER,
    RECRUITER_SIGNUP_ERROR_REDUCER, UPDATE_PROFILE_ERROR, EDIT_SUMMARY

} from './types';

import setAuthToken from "../utils/setAuthToken";

//Recruiter signup
export const recruiterSignup = (userData, history) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${CONSTANTS.BACKEND_URL}/recruiters/`, userData)
        .then(res => {
            // Save to localStorage
            if (res.status === 201) {
                axios.defaults.withCredentials = true;
                axios.post(`${CONSTANTS.BACKEND_URL}/recruiters/mongo`, userData)
                    .then(res => {
                        if(res.status === 201) {
                            const {token} = res.data;
                            //set token to local storage
                            localStorage.setItem('recruiterToken', token);
                            setAuthToken(token);
                            // Decode token to get user data
                            const decoded = jwt_decode(token);
                            // Set current user
                            dispatch(setCurrentUser(decoded));
                            history.push("/recruitersignup");
                            alert("Recruiter created successfully.");
                        }
                    })
                    .catch(err =>
                        dispatch({
                            type: RECRUITER_SIGNUP_ERROR_REDUCER,
                            payload: err.response.data.message
                        })
                    );
            } else {
                dispatchRecruiterSignupError(res.data);
            }
        })
        .catch(err =>
            dispatch({
                type: RECRUITER_SIGNUP_ERROR_REDUCER,
                payload: err.response.data.message
            })
        );
};


//Recruiter login
export const recruiterLogin = (userData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${CONSTANTS.BACKEND_URL}/recruiters/login`, userData)
        .then(res => {
            // Save to localStorage

            if (res.status === 200) {
                const {token} = res.data;
                //set token to local storage
                localStorage.setItem('recruiterToken', token);
                setAuthToken(token);
                // Decode token to get user data
                const decoded = jwt_decode(token);
                // Set current user
                dispatch(setCurrentUser(decoded));
            } else {
                dispatchRecruiterSignupError(res.data);
            }

        })
        .catch(err =>
            dispatch({
                type: RECRUITER_SIGNUP_ERROR_REDUCER,
                payload: err.response.data.error
            })
        );
};


//get Recruiter details
export const recruiterDetails = (recruiterEmail) => dispatch => {
    axios.defaults.withCredentials = true;
    setAuthToken(localStorage.getItem("recruiterToken"));


    axios.get(`${CONSTANTS.BACKEND_URL}/recruiters/${recruiterEmail}`)
        .then(res => {

            dispatch(currentRecruiterProfile(res.data));

        })
        .catch(err =>
            dispatch({
                type: RECRUITER_GET_ERRORS,
                payload: err.response
            })
        );
};

//edit summary
export const editSummary = summary => dispatch => {
    axios.defaults.withCredentials = true;
    setAuthToken(localStorage.getItem("recruiterToken"));
    axios
        .put(`${CONSTANTS.BACKEND_URL}/recruiters/summary/edit`, summary)
        .then(res => {
            // Save to localStorage

            if (res.status === 202) {
                dispatch({
                    type: EDIT_SUMMARY,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: UPDATE_PROFILE_ERROR,
                    payload: res.data
                });
            }
        })
        .catch(err =>
            dispatch({
                type: UPDATE_PROFILE_ERROR,
                payload: err.message
            })
        );
};

export const currentRecruiterProfile = decoded => {
    return {
        type: RECRUITER_PROFILE,
        payload: decoded
    };
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_RECRUITER_CURRENT_USER,
        payload: decoded
    };
};

export const dispatchRecruiterSignupError = decoded => {
    return {
        type: RECRUITER_SIGNUP_ERROR_REDUCER,
        payload: decoded
    };
};