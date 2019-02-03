import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { unsetNotification, setNotification } from '../actions';
import colors from '../utils/colors';

function shuffleArray(array) {
  let arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

class Quiz extends Component {
  static navigationOptions = {
    title: 'Quiz',
    headerLeft: null,
  };

  state = {
    currentIndex: 0,
    correct: 0,
    questions: [],
    showAnswer: false,
    end: false,
  };

  componentDidMount() {
    this.initGame();
  }

  initGame = () => {
    const questions = this.props.navigation.getParam('questions');
    this.setState({
      currentIndex: 0,
      correct: 0,
      questions: shuffleArray(questions),
      showAnswer: false,
      end: false,
    })
  }

  next = async () => {
    this.setState(state => ({
      showAnswer: false,
      currentIndex: state.currentIndex + 1,
    }));
    const { currentIndex, questions } = this.state;
    const length = questions.length;
    if(currentIndex === length - 1) {
      const { setNotification, unsetNotification } = this.props;
      await unsetNotification();
      await setNotification();
    }
  }

  correct = () => {
    this.setState(state => ({
      correct: state.correct + 1,
    }), () => this.next())
  }

  toggleAnswer = () => {
    this.setState(state => ({
      showAnswer: !state.showAnswer,
    }));
  }

  backToDeck = () => {
    this.props.navigation.goBack();
  }

  restartQuiz = () => {
    this.initGame();
  }

  render() {
    const { currentIndex, questions, correct, showAnswer } = this.state;
    const length = questions.length;

    if(currentIndex >= length) {
      return (
        <View style={styles.page}>
          <View style={styles.resultsView}>
            <Text>Result:</Text>
            <Text style={styles.resultText}>{correct}/{length}</Text>
          </View>
          <View style={styles.actionsView}>
            <TouchableOpacity
              style={{
                ...styles.button,
                ...styles.restartButton,
              }}
              onPress={this.restartQuiz}
            >
              <Text style={styles.buttonText}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.button,
                ...styles.backToDeckButton,
              }}
              onPress={this.backToDeck}
            >
              <Text style={styles.buttonText}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    const question = questions[currentIndex].question;
    const answer = questions[currentIndex].answer;

    return (
      <View style={styles.page}>
        <Text style={styles.questionsCount}>Question {currentIndex + 1} of {length}</Text>
        <TouchableOpacity
          style={styles.cardView}
          onPress={this.toggleAnswer}
        >
          <View style={styles.cardTitle}>
            <Text>
              {showAnswer ? 'Answer:' : 'Question:'}
            </Text>
          </View>
          <View style={styles.cardContent}>
            <Text
              style={styles.cardText}
            >
              {showAnswer ? answer : question}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.actionsView}>
          <TouchableOpacity
            style={{
              ...styles.button,
              ...styles.correctButton,
            }}
            onPress={this.correct}
          >
            <Text style={styles.correctButtonText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.button,
              ...styles.incorrectButton,
            }}
            onPress={this.next}
          >
            <Text style={styles.buttonText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  questionsCount: {
    marginBottom: 8,
  },
  resultText: {
    fontSize: 50,
  },
  resultsView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },
  cardView: {
    flex: 2,
    alignSelf: 'stretch',
    backgroundColor: colors.white,
    borderRadius: 4,
    padding: 8,
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cardText: {
    fontSize: 50,
  },
  actionsView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1
  },
  correctButton: {
    backgroundColor: colors.correctButton,
    marginBottom: 8,
  },
  incorrectButton: {
    backgroundColor: colors.incorrectButton,
  },
  restartButton: {
    backgroundColor: colors.startButton,
    marginBottom: 8,
  },
  backToDeckButton: {
    backgroundColor: colors.addButton,
  },
  button: {
    alignSelf: 'stretch',
    padding: 16,
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  correctButtonText: {
    fontWeight: 'bold',
  }
});

const mapDispatchToProps = {
  setNotification,
  unsetNotification,
};

export default connect(null, mapDispatchToProps)(Quiz);
