import request from 'superagent';
import { browserHistory } from 'react-router';
import Firebase from 'firebase';
//var secret = require('../secret/GifsTutorial-118b4ad3f98f.json');

//console.log(secret);

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const REQUEST_GIFS = 'REQUEST_GIFS';
export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

const API_URL = 'http://api.giphy.com/v1/gifs/search?q=';
const API_KEY = '&api_key=dc6zaTOxFJmzC';

//var ref = new Firebase("https://gifstutorial.firebaseio.com");
var config = {
  apiKey: "AIzaSyAGTdiLHcwupCyHWCVTn-DfZ36vnRkxuhU",
  authDomain: "gifstutorial.firebaseapp.com",
  databaseURL: "https://gifstutorial.firebaseio.com",
  storageBucket: "gifstutorial.appspot.com",
};

firebase.initializeApp(config);
var ref = firebase.auth();
var rootRef = firebase.database().ref();


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
  const userRef = ref.child(ref.auth.uid);
  const gifId = selectedGif.id;

  return dispatch => userRef.update({
    [gifId]: selectedGif
  });
}

export function unfavoriteGif({selectedGif}) {
  const userRef = ref.child(ref.auth.uid);
  const gifId = selectedGif.id;

  return dispatch => userRef.child(gifId).remove();
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

export function signUpUser(credentials)
{
  return function(dispatch) {
    ref.createUserWithEmailAndPassword(credentials.email,credentials.password)
    .then(res => {
        dispatch(signInUser(credentials));
        console.log(credentials);
    })
    .catch(error => dispatch(authError(error)));
  }
}

export function signInUser(credentials) {
  return function(dispatch) {
    ref.signInWithEmailAndPassword(credentials.email,credentials.password)
      .then(res => {
        dispatch({ type: SIGN_IN_USER});
        browserHistory.push('/favorites');
      })
      .catch(error => dispatch(authError(error)));
  }
}

export function authenticateUser() {
  return function (dispatch) {
    if (ref.auth) {
      dispatch({
        type: SIGN_IN_USER
      });
    } else {
      dispatch(signOutUser());
    }
  }
}

export function signOutUser()
{
  ref.signOut();
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
