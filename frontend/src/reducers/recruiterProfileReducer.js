import {RECRUITER_PROFILE, SET_RECRUITER_CURRENT_USER} from '../actions/types';

const initialState = {
    recruiterProfile: {},
    recruiterUser:{}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_RECRUITER_CURRENT_USER:
            return {
                ...state,
                recruiterUser: action.payload
            };
        case RECRUITER_PROFILE:
            return {
                ...state,
                recruiterProfile: action.payload
            };
        default:
            return state;
    }
}