(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global describe, it, expect */

const valid1 = require('../../valid1.json');

const invIndex = new InvertedIndex();

describe('InvertedIndex', () => {

  describe('defined methods', () => {
    invIndex.createIndex(valid1, 'valid1.json');
    it('Should ensure that invertedIndex methods are defined', () => {
      expect(invIndex.getIndex).not.toBeUndefined();
      expect(invIndex.createIndex).not.toBeUndefined();
      expect(invIndex.tokenize).not.toBeUndefined();
      expect(invIndex.validateFile).not.toBeUndefined();
      expect(invIndex.searchIndex).not.toBeUndefined();
    });
  });


});

},{"../../valid1.json":2}],2:[function(require,module,exports){
module.exports=[
  {
    "title": "The 'Alice' in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }, 
  {
    "title": "The Tower of Babel: Ancient History.",
    "text": "The Tower of Babel is a Near Eastern etiological myth that falls in the first book of the Jewish Tanakh (Genesis); it is meant to explain the origin of different languages."
  }
]
},{}]},{},[1])