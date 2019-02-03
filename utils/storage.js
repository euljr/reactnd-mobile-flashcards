const storage = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

async function getDecks() {
  return Promise.resolve(storage);
}

async function getDeck(id) {
  return Promise.resolve(storage[id]);
}

async function saveDeckTitle(title) {
  storage[title] = {
    title,
    questions: [],
  };
  return Promise.resolve();
}

async function addCardToDeck(title, card) {
  storage[title].questions.push(card);
  return Promise.resolve();
}

export {
  getDecks,
  getDeck,
  saveDeckTitle,
  addCardToDeck,
};
