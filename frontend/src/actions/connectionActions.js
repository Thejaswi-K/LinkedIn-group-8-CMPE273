import axios from 'axios';

import {
  GET_ALL_CONNECTIONS,
  GET_PENDING_REQUESTS
  

} from './types';

const ROOT_URL = "http://localhost:3001";


  // Get all homes
  export const getConnections = () => dispatch => {
    axios
      .get('http://localhost:3001/applicants/viewconnections/5bedf49fccefb3685709f81c')
      .then(res =>
        dispatch({
          type: GET_ALL_CONNECTIONS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ALL_CONNECTIONS,
          payload: null
        })
      );
  };

  export const getPendingRequets = () => dispatch => {
    axios
      .get('http://localhost:3001/applicants/viewPendingRequests/5bedf49fccefb3685709f81c')
      .then(res =>
        dispatch({
          type: GET_PENDING_REQUESTS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_PENDING_REQUESTS,
          payload: null
        })
      );
  };

  