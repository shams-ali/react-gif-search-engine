import { SIGN_IN_USER, SIGN_OUT_USER, AUTH_ERROR } from '../actions';

const initialState =  {
  authenticated: false,
  error: null
};

export default function gifs(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_USER:
      return {
        ...state,
        authenticated: true,
        error: null
      };
    case SIGN_OUT_USER:
      return {
        ...state,
        authenticated: false,
        error: null
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload.message
      };
    default:
      return state;
  }
}
