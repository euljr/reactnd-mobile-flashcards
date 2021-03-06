import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import colors from '../utils/colors';

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
  };

  add = () => {
    const { question, answer } = this.state;
    const { addQuestion, close } = this.props;
    if(question && answer) {
      addQuestion({ question, answer });
      close();
    }
  }


  render() {
    const { close } = this.props;
    return (
      <KeyboardAvoidingView style={styles.page}>
        <View style={styles.inputsView}>
          <View style={styles.inputView}>
            <Text>Question: </Text>
            <TextInput
              style={styles.input}
              onChangeText={question => this.setState({ question })}
            />
          </View>
          <View style={styles.inputView}>
            <Text>Answer: </Text>
            <TextInput
              style={styles.input}
              onChangeText={answer => this.setState({ answer })}
            />
          </View>
        </View>
        <View style={styles.actionsView}>
          <TouchableOpacity
            style={{
              ...styles.button,
              ...styles.addButton,
            }}
            onPress={this.add}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.button,
              ...styles.closeButton,
            }}
            onPress={close}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  title: {
    // color: colors.white,
    fontSize: 50,
    fontWeight: 'bold',
  },
  inputsView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 2,
  },
  inputView: {
    alignSelf: 'stretch',
    marginBottom: 8
  },
  actionsView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1
  },
  addButton: {
    backgroundColor: colors.startButton,
    marginBottom: 8,
  },
  closeButton: {
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
  },
  input: {
    borderWidth: 2,
    padding: 5,
    backgroundColor: 'white',
    borderColor: 'black',
    height: 40,
    alignSelf: 'stretch',
  }
});

export default NewCard;
