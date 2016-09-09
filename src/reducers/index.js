import { combineReducers } from 'redux';
import AuthReducer from './auth.js';
import GifsReducer from './gifs.js';
import ModalReducer from './modal.js';
import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  gifs: GifsReducer,
  modal: ModalReducer
});

export default rootReducer;
