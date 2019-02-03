import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import DeckList from './components/DeckList';
import DeckPage from './components/DeckPage';
import NewCard from './components/NewCard';
import NewDeck from './components/NewDeck';
import Quiz from './components/Quiz';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './utils/reduxStore'
import colors from './utils/colors';

const AppNavigator = createStackNavigator({
  DeckList,
  DeckPage,
  NewCard,
  NewDeck,
  Quiz,
}, {
  initialRouteName: 'DeckList',
  /* The header config from HomeScreen is now here */
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: colors.header,
    },
    headerTintColor: colors.white,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    )
  }
}
