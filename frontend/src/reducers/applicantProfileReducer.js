import {APPLICANT_PROFILE} from '../actions/types';

const initialState = {
    applicantProfile: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case APPLICANT_PROFILE:
            return {
                ...state,
                applicantProfile: action.payload
            };
        default:
            return state;

    }

}