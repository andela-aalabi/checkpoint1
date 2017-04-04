/* global describe, it, expect */

const valid = require('../../valid1.json');

const invIndex = new InvertedIndex();

const testBook = [{
  title: 'Checkpoint one',
  text: 'Testing getIndex function',
},

{
  title: 'Checkpoint Two',
  text: 'Coming soon',
},
];

describe('InvertedIndex : define methods', () => {
  invIndex.createIndex(testBook, valid);
  it('Should ensure that invertedIndex methods are defined', () => {
    expect(invIndex.getIndex).toBeDefined();
    expect(invIndex.createIndex).toBeDefined();
    expect(invIndex.tokenize).toBeDefined();
    expect(invIndex.validateFile).toBeDefined();
    expect(invIndex.searchIndex).toBeDefined();
  });
});
