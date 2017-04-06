/* global describe, it, expect */
const valid1 = require('../../src/test books/valid1.json'),
      valid2 = require('../../src/test books/valid2.json'),
      valid3 = require('../../src/test books/valid3.json'),
      valid4 = require('../../src/test books/valid4.json'),
      invalid1 = require('../../src/test books/invalid1.json'),
      invalid2 = require('../../src/test books/invalid2.json'),
      invalid3 = require('../../src/test books/invalid3.json'),
      invalid4 = require('../../src/test books/invalid4.json'),
      invalid5 = require('../../src/test books/invalid5.json'),
      invalid6 = require('../../src/test books/invalid6.json'),
      invalid7 = require('../../src/test books/invalid7.json');

const valid3AsIndexed = { '777': [ 1 ], the: [ 0, 1 ], triumphant: [ 0 ],
                          church: [ 0 ], christians: [ 0 ], are: [ 0 ],
                          already: [ 0 ], victorious: [ 0 ], not: [ 0 ],
                          militant: [ 0 ], or: [ 0 ], defeated: [ 0 ],
                          written: [ 1 ], by: [ 1 ], a: [ 1 ], man: [ 1 ],
                          considered: [ 1 ], most: [ 1 ], wicked: [ 1 ],
                          that: [ 1 ], ever: [ 1 ], lived: [ 1 ],
                          allister: [ 1 ], crowley: [ 1 ]
                        }

const valid4AsIndexed = { testing: [ 0 ], could: [ 0, 1 ], be: [ 0, 1 ],
                          annoying: [ 0 ], when: [ 1 ], tests: [ 1 ],
                          pass: [ 1 ], fulfilling: [ 1 ], and: [ 1 ],
                          rewarding: [ 1 ] }

const textString = 'why are We *% \n so blind \t to see two-timers#@!`~-_+=/?";';
const tokenizedTextString = [ 'why', 'are', 'we', 'so', 'blind', 'to', 'see',
                              'two', 'timers' ];

const invIndex = new InvertedIndex();

describe('InvertedIndex', () => {
  
  describe('constructor', () => {
    it('should be an instance of  InvertedIndex', () => {
      expect(invIndex instanceof InvertedIndex).toBeTruthy();
      expect(typeof (invIndex)).toEqual('object');
    });

    it('should have defualt instatiated  values', () => {
      expect(invIndex.allIndexed).not.toBe(null);
      expect(invIndex.allTitles).not.toBe(null);
      expect(invIndex.documentsIndex).not.toBe(null);
      expect(invIndex.allIndexed).toEqual({});
      expect(invIndex.allTitles).toEqual({});
      expect(invIndex.documentsIndex).toEqual({});
      expect(invIndex.allIndexed).toBeDefined();
      expect(invIndex.allTitles).toBeDefined();
      expect(invIndex.documentsIndex).toBeDefined();
    });
  });

  describe('readFile', () => {
    it('should be defined', () => {
      expect(invIndex.readFile).not.toBeUndefined();
    });

    it('should be a function', () => {
      expect(typeof invIndex.readFile).toBe('function');      
    });
  });

  describe('tokenize', () => {
    it('should eliminate special characters, symbols and white spaces', () => {
      expect(invIndex.tokenize).not.toBeUndefined();
      expect(typeof invIndex.tokenize).toBe('function');
      expect(invIndex.tokenize(textString)).toEqual(tokenizedTextString);
    });
  });

  describe('createIndex', () => {
    it('should create indices properly', () => {
      expect(invIndex.createIndex).not.toBeUndefined();
      expect(typeof invIndex.createIndex).toBe('function');
      expect(invIndex.createIndex(valid3, 'valid3.json')).toEqual(valid3AsIndexed);
    });
  });

  describe('getIndex', () => {
    it('should get indices from already created ones', () => {
      invIndex.createIndex(valid3, 'valid3.json');
      expect(invIndex.getIndex).not.toBeUndefined();
      expect(typeof invIndex.getIndex).toBe('function');
      expect(invIndex.getIndex(valid3, 'valid3.json')).toEqual(valid3AsIndexed);
    });

    it('should create indices if file is not yet indexed', () => {
      expect(invIndex.getIndex(valid4, 'valid4.json')).toEqual(valid4AsIndexed);
    });
  });

  describe('validateFile', () => {
    it('should be defined and should be false if file is not an array', () => {
      expect(invIndex.validateFile).not.toBeUndefined();      
      expect(invIndex.validateFile(invalid1, 'invalid1.json')).toBeFalsy();
    });

    it('should be a function and should be false if file is not an array of objects', () => {
      expect(typeof invIndex.validateFile).toBe('function');      
      expect(invIndex.validateFile(invalid2, 'invalid2.json')).toBeFalsy();
    });

    it('should be false if file does not contain only "text" and "title" keys', () => {
      expect(invIndex.validateFile(invalid3, 'invalid3.json')).toBeFalsy();
      expect(invIndex.validateFile(invalid4, 'invalid4.json')).toBeFalsy();
      expect(invIndex.validateFile(invalid5, 'invalid5.json')).toBeFalsy();
    });

    it('should be false if file  "text" and "title" values are not Strings', () => {
      expect(invIndex.validateFile(invalid6, 'invalid6.json')).toBeFalsy();
      expect(invIndex.validateFile(invalid7, 'invalid7.json')).toBeFalsy();
    });

    it('should be true if files are formatted properly', () => {
      expect(invIndex.validateFile(valid1, 'valid1.json')).toBeTruthy();
      expect(invIndex.validateFile(valid2, 'valid2.json')).toBeTruthy();
    });
  });

  // describe('searchIndex', () => {
  //   it('Should be able to get indices of words from already indexed files', () => {
  //     invIndex.createIndex(valid3, 'valid3.json');
  //     invIndex.createIndex(valid4, 'valid4.json');

  //     expect(invIndex.searchIndex).not.toBeUndefined();
  //     expect(typeof invIndex.searchIndex).toBe('function');
  //     expect(invIndex.searchIndex('could', 'valid4.json')).toEqual([ 0, 1 ]);
  //     expect(invIndex.searchIndex('testing', 'valid4.json')).toEqual([ 0 ]);
  //     expect(invIndex.searchIndex('pass', 'valid4.json')).toEqual([ 1 ]);
  //     expect(invIndex.searchIndex('the', 'valid3.json')).toEqual([ 0, 1 ]);
  //   });
  // });
});