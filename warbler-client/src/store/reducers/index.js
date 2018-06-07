import { combineReducers } from 'redux';
import currenUser from './currentUser';
import errors from './errors';

const rootReducer = combineReducers({
  currentUser,
  errors
});

export default rootReducer;