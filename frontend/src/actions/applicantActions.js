import axios from 'axios';
import jwt_decode from 'jwt-decode';


import {
    APPLICANT_PROFILE,
    GET_ERRORS,
    SET_APPLICANT_CURRENT_USER,
    APPLICANT_SIGNUP_ERROR_REDUCER

} from './types';

import setAuthToken from "../utils/setAuthToken";

const ROOT_URL = "http://localhost:3001";

//const ROOT_URL = "http://100.25.240.95:3001";


//applicant signup
export const applicantSignup = (userData, history) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${ROOT_URL}/applicants/`, userData)
        .then(res => {
            // Save to localStorage

            if (res.status === 200) {

                axios.defaults.withCredentials = true;
                axios.post(`${ROOT_URL}/applicants/mongo`, userData)
                    .then(res => {
                        const {token} = res.data;
                        //set token to local storage
                        localStorage.setItem('applicantToken', token);
                        setAuthToken(token);
                        // Decode token to get user data
                        const decoded = jwt_decode(token);
                        // Set current user
                        dispatch(setCurrentUser(decoded));
                        history.push("/applicantprofileview")
                    })
                    .catch(err =>
                        dispatch({
                            type: APPLICANT_SIGNUP_ERROR_REDUCER,
                            payload: err.response
                        })
                    );


            } else {
                dispatchApplicantSignupError(res.data);
            }
        })
        .catch(err =>
            dispatch({
                type: APPLICANT_SIGNUP_ERROR_REDUCER,
                payload: err.response
            })
        );
};

//applicant login
export const applicantLogin = (userData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${ROOT_URL}/applicants/login`, userData)
        .then(res => {
            // Save to localStorage

            if (res.status === 200) {
                const {token} = res.data;
                //set token to local storage
                localStorage.setItem('applicantToken', token);
                setAuthToken(token);
                // Decode token to get user data
                const decoded = jwt_decode(token);
                // Set current user
                dispatch(setCurrentUser(decoded));
            } else {
                dispatchApplicantSignupError(res.data);
            }


        })
        .catch(err =>
            dispatch({
                type: APPLICANT_SIGNUP_ERROR_REDUCER,
                payload: err.message
            })
        );
};

//get applicant bookings
export const applicantDetails = (applicantEmail) => dispatch => {
    axios.defaults.withCredentials = true;
    setAuthToken(localStorage.getItem("applicantToken"));


    axios.get(`${ROOT_URL}/applicants/${applicantEmail}`)
        .then(res => {

            dispatch(currentApplicantProfile(res.data));

        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            })
        );
};

export const currentApplicantProfile = decoded => {
    return {
        type: APPLICANT_PROFILE,
        payload: decoded
    };
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_APPLICANT_CURRENT_USER,
        payload: decoded
    };
};

export const dispatchApplicantSignupError = decoded => {
    return {
        type: APPLICANT_SIGNUP_ERROR_REDUCER,
        payload: decoded
    };
};
