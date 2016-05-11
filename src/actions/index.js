import request from 'superagent';
import { browserHistory } from 'react-router';
import Firebase from 'firebase';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const REQUEST_GIFS = 'REQUEST_GIFS';
export const FETCH_FAVORITED_GIFS = 'FETCH_FAVORITED_GIFS';
export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

const API_URL = 'http://api.giphy.com/v1/gifs/search?q=';
const API_KEY = '&api_key=dc6zaTOxFJmzC';

const ref = new Firebase('<YOUR FIREBASE URL>');

export function requestGifs(term = null) {
  return function(dispatch) {
    request.get(`${API_URL}${term.replace(/\s/g, '+')}${API_KEY}`).then(response => {
      dispatch({
        type: REQUEST_GIFS,
        payload: response
      });
    });
  }
}

export function favoriteGif({selectedGif}) {
  const userRef = ref.child(ref.getAuth().uid);
  const gifId = selectedGif.id;

  return dispatch => userRef.update({
    [gifId]: selectedGif
  });
}

export function unfavoriteGif({selectedGif}) {
  const userRef = ref.child(ref.getAuth().uid);
  const gifId = selectedGif.id;

  return dispatch => userRef.child(gifId).remove();
}

export function fetchFavoritedGifs() {
  return function(dispatch) {
    const userRef = ref.child(ref.getAuth().uid);
    userRef.on('value', snapshot => {
      dispatch({
        type: FETCH_FAVORITED_GIFS,
        payload: snapshot.val()
      })
    });
  }
}

export function openModal(gif) {
  return {
    type: OPEN_MODAL,
    gif
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  }
}

export function signUpUser(credentials) {
  return function(dispatch) {
    ref.createUser({
      email: credentials.email,
      password: credentials.password
    }, function (error, userData) {
      if (error) {
        dispatch(authError(error));
      } else {
        dispatch(signInUser(credentials));
      }
    });
  }
}

export function signInUser(credentials) {
  return function(dispatch) {
    ref.authWithPassword({
      email: credentials.email,
      password: credentials.password
    }, function(error, authData) {
      if (error) {
        dispatch(authError(error));
      } else {
        dispatch({
          type: SIGN_IN_USER
        });

        console.log(authData);
        browserHistory.push('/favorites');
      }
    });
  }
}

export function authenticateUser() {
  return function (dispatch) {
    if (ref.getAuth()) {
      dispatch({
        type: SIGN_IN_USER
      });
    } else {
      dispatch(signOutUser());
    }
  }
}



export function signOutUser() {
  browserHistory.push('/');

  return {
    type: SIGN_OUT_USER
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
