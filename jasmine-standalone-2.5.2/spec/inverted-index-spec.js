/* global describe, it, expect */

const valid1 = require('../../valid1.json');
const valid2 = require('../../valid2.json');
const valid3 = require('../../valid3.json');
const invalid1 = require('../../invalid1.json');
const invalid2 = require('../../invalid2.json');
const invalid3 = require('../../invalid3.json');
const invalid4 = require('../../invalid4.json');
const invalid5 = require('../../invalid5.json');
const invalid6 = require('../../invalid6.json');

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

  describe('class', () => {
    it('should have a readFile method', () => {
      expect(typeof InvertedIndex.readFile).toBe('function');
    });

    it('should have a createIndex method', () => {
      expect(typeof invertedIndex.createIndex).toBe('function');
    });

    it('should have a getIndex method', () => {
      expect(typeof invertedIndex.getIndex).toBe('function');
    });

    it('should have a searchIndex method', () => {
      expect(typeof invertedIndex.searchIndex).toBe('function');
    });

    it('should have a validateFile method', () => {
      expect(typeof InvertedIndex.validateFile).toBe('function');
    });

    it('should have a tokenize method', () => {
      expect(typeof InvertedIndex.tokenize).toBe('function');
    });
  });

  describe('createIndex', () => {
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
