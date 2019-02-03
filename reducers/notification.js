import { SET_NOTIFICATION, UNSET_NOTIFICATION } from '../actions';

export default function notification(state = false, action) {
  switch(action.type) {
    case SET_NOTIFICATION:
      return true;
    case UNSET_NOTIFICATION:
      return false;
    default:
      return state;
  }
}
