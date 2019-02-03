import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../utils/colors';

class Deck extends Component {
  render() {
    const { title, questions, onPress } = this.props;
    return (
      <TouchableOpacity style={styles.deck} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        <Text>{questions} cards</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 25,
  },
});

export default Deck;
