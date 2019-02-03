import { Notifications, Permissions } from 'expo';

export const ADD_DECK = 'ADD_DECK';
export const ADD_QUESTION = 'ADD_QUESTION';

export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const UNSET_NOTIFICATION = 'UNSET_NOTIFICATION';

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  };
}

export function addQuestion(deck, question) {
  return {
    type: ADD_QUESTION,
    deck,
    question,
  };
}

export function setNotification() {
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(20);
  tomorrow.setMinutes(0);

  let notificationData = {
    title: 'Flashcards',
    body: "Don't forget to complete a quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  };

  return async (dispatch, getState) => {
    try {
      const { notification } = getState();
      if(!notification) {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (status === 'granted') {
          await Notifications.cancelAllScheduledNotificationsAsync();
          await Notifications.scheduleLocalNotificationAsync(
            notificationData,
            {
              time: tomorrow,
              repeat: 'day',
            }
          );
          dispatch({ type: SET_NOTIFICATION });
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export function unsetNotification() {
  return async dispatch => {
    dispatch({ type: UNSET_NOTIFICATION });
    return await Notifications.cancelAllScheduledNotificationsAsync();
  }
}
