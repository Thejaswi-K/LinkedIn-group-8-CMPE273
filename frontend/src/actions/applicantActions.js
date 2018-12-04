import axios from "axios";
import jwt_decode from "jwt-decode";

import {
  APPLICANT_PROFILE,
  GET_ERRORS,
  SET_APPLICANT_CURRENT_USER,
  APPLICANT_SIGNUP_ERROR_REDUCER,
  ADD_EXPERIENCE,
  UPDATE_PROFILE_ERROR,
  ADD_SKILLS,
  ADD_EDUCATION,
  EDIT_SUMMARY,
  APPLICANT_DELETE,
  SET_USER_LOGOUT
} from "./types";

import setAuthToken from "../utils/setAuthToken";
import { CONSTANTS } from "../Constants";

//const ROOT_URL = "http://LinkedIn-Backend-1636541959.us-west-1.elb.amazonaws.com:3001";

//const ROOT_URL = "http://100.25.240.95:3001";

//applicant signup
export const applicantSignup = (userData, history) => dispatch => {
  axios.defaults.withCredentials = true;
  axios
    .post(`${CONSTANTS.BACKEND_URL}/applicants/`, userData)
    .then(res => {
      // Save to localStorage

      if (res.status === 201) {
        axios.defaults.withCredentials = true;
        axios
          .post(`${CONSTANTS.BACKEND_URL}/applicants/mongo`, userData)
          .then(res => {
            if (res.status === 201) {
              const { token } = res.data;
              //set token to local storage
              localStorage.setItem("applicantToken", token);
              setAuthToken(token);
              // Decode token to get user data
              const decoded = jwt_decode(token);
              // Set current user
              dispatch(setCurrentUser(decoded));
              history.push("/applicantsignup");
              alert("Applicant created successfully.");
            }
          })
          .catch(err =>
            dispatch({
              type: APPLICANT_SIGNUP_ERROR_REDUCER,
              payload: err.response.data.message
            })
          );
      } else {
        dispatchApplicantSignupError(res.data);
      }
    })
    .catch(err =>
      dispatch({
        type: APPLICANT_SIGNUP_ERROR_REDUCER,
        payload: err.response.data.message
      })
    );
};

//applicant login
export const applicantLogin = userData => dispatch => {
  axios.defaults.withCredentials = true;
  axios
    .post(`${CONSTANTS.BACKEND_URL}/applicants/login`, userData)
    .then(res => {
      // Save to localStorage

      if (res.status === 200) {
        const { token } = res.data;
        //set token to local storage
        localStorage.setItem("applicantToken", token);
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

//add experience
export const addExperience = experience => dispatch => {
  axios.defaults.withCredentials = true;
  axios
    .put(`${CONSTANTS.BACKEND_URL}/applicants/experience/add`, experience)
    .then(res => {
      // Save to localStorage

      if (res.status === 202) {
        dispatch({
          type: ADD_EXPERIENCE,
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

//edit experience
export const editExperience = experience => dispatch => {
  axios.defaults.withCredentials = true;
  axios
    .put(`${CONSTANTS.BACKEND_URL}/applicants/experience/edit`, experience)
    .then(res => {
      // Save to localStorage

      if (res.status === 202) {
        dispatch({
          type: ADD_EXPERIENCE,
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

//add education
export const addEducation = education => dispatch => {
  axios.defaults.withCredentials = true;
  axios
    .put(`${CONSTANTS.BACKEND_URL}/applicants/education/add`, education)
    .then(res => {
      // Save to localStorage

      if (res.status === 202) {
        dispatch({
          type: ADD_EDUCATION,
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

//edit education
export const editEducation = education => dispatch => {
  axios.defaults.withCredentials = true;
  axios
    .put(`${CONSTANTS.BACKEND_URL}/applicants/education/edit`, education)
    .then(res => {
      // Save to localStorage

      if (res.status === 202) {
        dispatch({
          type: ADD_EDUCATION,
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

//edit skills
export const editSkills = skills => dispatch => {
  axios.defaults.withCredentials = true;
  axios
    .put(`${CONSTANTS.BACKEND_URL}/applicants/skills/edit`, skills)
    .then(res => {
      // Save to localStorage

      if (res.status === 202) {
        dispatch({
          type: ADD_SKILLS,
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

//add skills
export const addSkills = skills => dispatch => {
  axios.defaults.withCredentials = true;
  axios
    .put(`${CONSTANTS.BACKEND_URL}/applicants/skills/add`, skills)
    .then(res => {
      // Save to localStorage

      if (res.status === 202) {
        dispatch({
          type: ADD_SKILLS,
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

//edit summary
export const editSummary = summary => dispatch => {
  axios.defaults.withCredentials = true;
  axios
    .put(`${CONSTANTS.BACKEND_URL}/applicants/summary/edit`, summary)
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

//get applicant profile
export const applicantDetails = applicantEmail => dispatch => {
  axios.defaults.withCredentials = true;
  setAuthToken(localStorage.getItem("applicantToken"));

  axios
    .get(`${CONSTANTS.BACKEND_URL}/applicants/${applicantEmail}`)
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

//delete applicant
export const deleteApplicant = applicantEmail => dispatch => {
  axios.defaults.withCredentials = true;
  setAuthToken(localStorage.getItem("applicantToken"));

  axios
    .delete(`${CONSTANTS.BACKEND_URL}/applicants/${applicantEmail}`)
    .then(res => {
      // Save to localStorage

      if (res.status === 202) {
        setAuthToken(localStorage.getItem("applicantToken"));
        axios.defaults.withCredentials = true;
        axios
          .delete(`${CONSTANTS.BACKEND_URL}/applicants/mysql/${applicantEmail}`)
          .then(res => {
            if (res.status === 202) {
              dispatch({
                type: APPLICANT_DELETE,
                payload: res.data
              });
            }
          })
          .catch(err =>
            dispatch({
              type: UPDATE_PROFILE_ERROR,
              payload: err.response
            })
          );
      } else {
        dispatch({
          type: UPDATE_PROFILE_ERROR,
          payload: res.message
        });
      }
    })
    .catch(err =>
      dispatch({
        type: UPDATE_PROFILE_ERROR,
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

// Set logged in user
export const setDelete = decoded => {
  return {
    type: APPLICANT_DELETE,
    payload: decoded
  };
};

// Log user out
export const deleteUser = () => dispatch => {
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setDelete(""));
};

//Set Logged out User
export const setCustomerOut = decoded => {
  return {
    type: SET_USER_LOGOUT,
    payload: decoded
  };
};

//Set Logged Out User
export const logoutCustomer = () => dispatch => {
  // Remove token from sessionStorage
  localStorage.removeItem("applicantToken");
  //Remove auth Header from future requests
  setAuthToken(false);
  // Set current user to {} which will ser isAuthenticated to false
  dispatch(setCustomerOut({}));
    dispatch(setDelete(""));
};
