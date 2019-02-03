import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import NewCard from './NewCard';
import { connect } from 'react-redux';
import { addQuestion } from '../actions';
import colors from '../utils/colors';

class DeckPages extends Component {
  state = {
    cardFormVisible: false,
  };

  toggleAddCard = () => {
    this.setState(state => ({
      cardFormVisible: !state.cardFormVisible,
    }));
  }

  startQuiz = () => {
    const { title, questions } = this.props;
    this.props.navigation.navigate('Quiz', { title, questions });
  }

  render() {
    const { addQuestion, title, questions } = this.props;
    const { cardFormVisible } = this.state;
    return (
      <View style={styles.deckPage}>
        <Modal
          visible={cardFormVisible}
          animationType="slide"
          transparent={false}
        >
          <NewCard
            addQuestion={question => addQuestion(title, question)}
            close={this.toggleAddCard}
          />
        </Modal>
        <View style={styles.titleView}>
          <Text style={styles.title}>{title}</Text>
          <Text>{questions.length} cards</Text>
        </View>
        <View style={styles.actionsView}>
          <TouchableOpacity
            style={{
              ...styles.button,
              ...styles.startButton,
            }}
            onPress={this.startQuiz}
          >
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.button,
              ...styles.addButton,
            }}
            onPress={this.toggleAddCard}
          >
            <Text style={styles.buttonText}>Create New Question</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckPage: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  title: {
    // color: colors.white,
    fontSize: 50,
    fontWeight: 'bold',
  },
  titleView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },
  actionsView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1
  },
  startButton: {
    backgroundColor: colors.startButton,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: colors.addButton,
  },
  button: {
    alignSelf: 'stretch',
    padding: 16,
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  }
});

function mapStateToProps(state, props) {
  const { navigation } = props;
  const title = navigation.getParam('title');
  return {
    title,
    questions: state.questions[title],
  };
}

const mapDispatchToProps = {
  addQuestion,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckPages);
