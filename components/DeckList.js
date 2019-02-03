import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Button, Modal } from 'react-native';
import Deck from './Deck';
import { connect } from 'react-redux';
import { addDeck, setNotification } from '../actions';
import NewDeck from './NewDeck';
import colors from '../utils/colors'

class DeckList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Deck List',
      headerRight: (
        <Button
          onPress={navigation.getParam('addDeck') || (() => {})}
          title="Add Deck"
          color={colors.white}
        />
      ),
    }
  };

  state = {
    deckFormVisible: false,
  };

  componentDidMount() {
    const { navigation, setNotification } = this.props;
    navigation.setParams({ addDeck: this.toggleAddDeck });
    setNotification();
  }

  toggleAddDeck = () => {
    this.setState(state => ({ deckFormVisible: !state.deckFormVisible }));
  }

  navigate = deck => {
    const { navigation } = this.props;
    navigation.navigate('DeckPage', { title: deck.title });
  }

  addDeck = title => {
    const { addDeck, navigation } = this.props;
    addDeck(title);
    navigation.navigate('DeckPage', { title });
  }

  render() {
    const { deckFormVisible } = this.state;
    const { decks } = this.props;
    return (
      <View style={styles.deckList}>
        <Modal
          visible={deckFormVisible}
          animationType="slide"
          transparent={false}
        >
          <NewDeck addDeck={this.addDeck} close={this.toggleAddDeck} />
        </Modal>
        <FlatList
          data={decks}
          renderItem={({item}) => <Deck title={item.title} questions={item.questions.length} onPress={() => this.navigate(item)}/>}
          keyExtractor={(item, index) => item.title + index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckList: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
});

function mapStateToProps(state) {
  const decks = Object.values(state.decks)
    .map(({ title }) => ({
      title,
      questions: state.questions[title] ? state.questions[title] : [],
    }));
  return {
    decks,
  };
}

const mapDispatchToProps = {
  addDeck,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
