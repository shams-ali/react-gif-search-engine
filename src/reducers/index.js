import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import AuthReducer from './auth.js';
import GifsReducer from './gifs.js';
import ModalReducer from './modal.js';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  gifs: GifsReducer,
  modal: ModalReducer,
});

export default rootReducer;
