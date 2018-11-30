import axios from 'axios';

import {
  GET_SEARCHED_PROFILES
  

} from './types';

const ROOT_URL = "http://localhost:3001";


  // Get all homes
  export const getSearchedProfiles = (searchdata) => dispatch => {
    axios
      .post('http://localhost:3001/applicants/searchprofile', searchdata)
      .then(res =>
        dispatch({
          type: GET_SEARCHED_PROFILES,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_SEARCHED_PROFILES,
          payload: null
        })
      );
  };

 

  