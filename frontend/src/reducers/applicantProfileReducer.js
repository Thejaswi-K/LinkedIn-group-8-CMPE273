import {APPLICANT_PROFILE, SET_APPLICANT_CURRENT_USER} from '../actions/types';

const initialState = {
    applicantProfile: {},
    applicantUser:{}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_APPLICANT_CURRENT_USER:
            return {
                ...state,
                applicantUser: action.payload
            };
        case APPLICANT_PROFILE:
            return {
                ...state,
                applicantProfile: action.payload
            };
        default:
            return state;

    }

}