import { ADD_DECK, ADD_QUESTION } from '../actions';

export default function questions (state = {}, action) {
  switch(action.type) {
    case ADD_DECK:
      return {
        ...state,
        [action.deck]: [],
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.deck]: [
          ...state[action.deck],
          action.question,
        ],
      };
    default:
      return state;
  }
}
