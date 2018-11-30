import { 
    GET_SEARCHED_PROFILES
    
  } from '../actions/types';
  
  const initialState = {
    
    searchedprofiles: null
    
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_SEARCHED_PROFILES:
      return {
        ...state,
        searchedprofiles: action.payload
      };
      default:
        return state;
    }
  }
  