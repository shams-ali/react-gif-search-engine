import request from 'superagent';
import { browserHistory } from 'react-router';
import Firebase from 'firebase';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const FETCH_FAVORITED_GIFS = 'FETCH_FAVORITED_GIFS';
export const REQUEST_GIFS = 'REQUEST_GIFS';
export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

const API_URL = 'http://api.giphy.com/v1/gifs/search?q=';
const API_KEY = '&api_key=dc6zaTOxFJmzC';

const config = {
  apiKey: 'AIzaSyAGTdiLHcwupCyHWCVTn-DfZ36vnRkxuhU',
  authDomain: 'gifstutorial.firebaseapp.com',
  databaseURL: 'https://gifstutorial.firebaseio.com',
  storageBucket: 'gifstutorial.appspot.com',
};

Firebase.initializeApp(config);
const ref = Firebase.auth();

export function signOutUser() {
  ref.signOut();
  browserHistory.push('/');

  return {
    type: SIGN_OUT_USER,
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function authenticateUser() {
  return function (dispatch) {
    if (ref.auth) {
      dispatch({
        type: SIGN_IN_USER,
      });
    } else {
      dispatch(signOutUser());
    }
  };
}

export function requestGifs(term = null) {
  return function (dispatch) {
    request.get(`${API_URL}${term.replace(/\s/g, '+')}${API_KEY}`).then(response => {
      dispatch({
        type: REQUEST_GIFS,
        payload: response,
      });
    });
  };
}

export function favoriteGif({ selectedGif }) {
  const gifId = selectedGif.id;

  return () => (Firebase.database().ref().update({
    [gifId]: selectedGif,
  }));
}

export function unfavoriteGif({ selectedGif }) {
  const gifId = selectedGif.id;

  return () => Firebase.database().ref().child(gifId).remove();
}

export function fetchFavoritedGifs() {
  return function (dispatch) {
    Firebase.database().ref().on('value', snapshot => {
      dispatch({
        type: FETCH_FAVORITED_GIFS,
        payload: snapshot.val(),
      });
    });
  };
}

export function openModal(gif) {
  return {
    type: OPEN_MODAL,
    gif,
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}

export function signInUser(credentials) {
  return function (dispatch) {
    ref.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: SIGN_IN_USER });
        browserHistory.push('/favorites');
      })
      .catch(error => dispatch(authError(error)));
  };
}

export function signUpUser(credentials) {
  return function (dispatch) {
    ref.createUserWithEmailAndPassword(credentials.email, credentials.password)
    .then(() => {
      dispatch(signInUser(credentials));
    })
    .catch(error => dispatch(authError(error)));
  };
}
