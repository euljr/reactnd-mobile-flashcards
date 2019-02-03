import { combineReducers } from 'redux';
import decks from './decks';
import questions from './questions';
import notification from './notification';

export default combineReducers({
  decks,
  questions,
  notification,
});
