(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global describe, it, expect, InvertedIndex */
const fantasyBook = require('./test books/fantasyBook.json');
const quotesAndRap = require('./test books/quotesAndRap.json');
const religiousBook = require('./test books/religiousBook.json');
const testsBook = require('./test books/testsBook.json');
const notArray = require('./test books/notArray.json');
const notArrayOfObjects = require('./test books/notArrayOfObjects.json');
const moreThanTwoKeys = require('./test books/moreThanTwoKeys.json');
const notAllTextKeys = require('./test books/notAllTextKeys.json');
const capitalTitleKey = require('./test books/capitalTitleKey.json');
const titleValueAsNumber = require('./test books/titleValueAsNumber.json');
const textValueAsNumber = require('./test books/textValueAsNumber.json');
const religiousBookIndexes = require('./test books/religiousBookIndexes.json');


const invertedIndex = new InvertedIndex();

describe('InvertedIndex', () => {
  describe('constructor', () => {
    it('should be an instance of  InvertedIndex', () => {
      expect(invertedIndex instanceof InvertedIndex).toBeTruthy();
      expect(typeof (invertedIndex)).toEqual('object');
    });

    it('should have defualt instatiated  values', () => {
      expect(invertedIndex.allIndexed).not.toBe(null);
      expect(invertedIndex.allTitles).not.toBe(null);
      expect(invertedIndex.documentsIndex).not.toBe(null);
      expect(invertedIndex.allIndexed).toEqual({});
      expect(invertedIndex.allTitles).toEqual({});
      expect(invertedIndex.documentsIndex).toEqual({});
      expect(invertedIndex.allIndexed).toBeDefined();
      expect(invertedIndex.allTitles).toBeDefined();
      expect(invertedIndex.documentsIndex).toBeDefined();
    });
  });

  describe('methods', () => {
    it('should be defined', () => {
      expect(InvertedIndex.readFile).not.toBeUndefined();
      expect(InvertedIndex.tokenize).not.toBeUndefined();
      expect(invertedIndex.createIndex).not.toBeUndefined();
      expect(invertedIndex.getIndex).not.toBeUndefined();
      expect(InvertedIndex.validateFile).not.toBeUndefined();
      expect(invertedIndex.searchIndex).not.toBeUndefined();
    });

    it('should be a function', () => {
      expect(typeof InvertedIndex.readFile).toBe('function');
      expect(typeof InvertedIndex.tokenize).toBe('function');
      expect(typeof invertedIndex.createIndex).toBe('function');
      expect(typeof invertedIndex.getIndex).toBe('function');
      expect(typeof InvertedIndex.validateFile).toBe('function');
      expect(typeof invertedIndex.searchIndex).toBe('function');
    });
  });


  describe('tokenize', () => {
    it('should eliminate special characters, symbols and white spaces', () => {
      const textString = 'why We\n so See\t two-timers#@!`~_+=/?"';

      const tokenizedTextString = ['why', 'we', 'so', 'see', 'two', 'timers'];
      expect(InvertedIndex.tokenize(textString)).toEqual(tokenizedTextString);
    });
  });

  describe('createIndex', () => {
    it('should create indices properly', () => {
      expect(invertedIndex.createIndex(religiousBook, 'religiousBook.json'))
        .toEqual(religiousBookIndexes);
    });
  });

  describe('getIndex', () => {
    it('should get indices from already created ones', () => {
      invertedIndex.createIndex(religiousBook, 'religiousBook.json');
      expect(invertedIndex.getIndex(religiousBook, 'religiousBook.json'))
        .toEqual(religiousBookIndexes);
    });

    it('should be false if file is not yet indexed', () => {
      expect(invertedIndex.getIndex(testsBook, 'testsBook.json'))
        .toEqual(false);
    });
  });

  describe('validateFile', () => {
    it('should be false if file is not an array', () => {
      expect(InvertedIndex.validateFile(notArray, 'notArray.json'))
        .toBeFalsy();
    });

    it('should be false if file is not an array of objects', () => {
      expect(InvertedIndex.validateFile(
        notArrayOfObjects, 'notArrayOfObjects.json')).toBeFalsy();
    });

    it('should be false if file does not contain only "text" and "title" keys',
    () => {
      expect(InvertedIndex.validateFile(
        moreThanTwoKeys, 'moreThanTwoKeys.json')).toBeFalsy();

      expect(InvertedIndex.validateFile(
        notAllTextKeys, 'notAllTextKeys.json')).toBeFalsy();

      expect(InvertedIndex.validateFile(
        capitalTitleKey, 'capitalTitleKey.json')).toBeFalsy();
    });

    it('should be false if file "text" and "title" values are not Strings',
    () => {
      expect(InvertedIndex.validateFile(titleValueAsNumber,
        'titleValueAsNumber.json')).toBeFalsy();

      expect(InvertedIndex.validateFile(textValueAsNumber,
        'textValueAsNumber.json')).toBeFalsy();
    });

    it('should be true if files are formatted properly', () => {
      expect(InvertedIndex.validateFile(fantasyBook, 'fantasyBook.json'))
        .toBeTruthy();
      expect(InvertedIndex.validateFile(quotesAndRap, 'quotesAndRap.json'))
        .toBeTruthy();
    });
  });

  describe('searchIndex', () => {
    it('should be able to get indices from already indexed files', () => {
      invertedIndex.createIndex(testsBook, 'testsBook.json');

      expect((invertedIndex.searchIndex('and', 'testsBook.json'))[0]
        .indexes.and).toEqual([1]);
      expect((invertedIndex.searchIndex('the', 'religiousBook.json'))[0]
        .indexes.the).toEqual([0, 1]);
    });

    it('should be false if empty string is searched for', () => {
      expect(invertedIndex.searchIndex(' ', 'religiousBook.json')).toBe(false);
    });

    it('should be able to search for multiple words in one file', () => {
      invertedIndex.createIndex(fantasyBook, 'fantasyBook.json');

      expect((invertedIndex.searchIndex(
        'and,the,that', 'fantasyBook.json'))[0].indexes)
          .toEqual({ and: [0, 1], the: [0, 1, 2], that: [2] });
    });

    it('should be able to search for multiple words in multiple files', () => {
      invertedIndex.createIndex(quotesAndRap, 'quotesAndRap.json');

      expect((invertedIndex.searchIndex('the, that, in', 'All'))[2].indexes)
        .toEqual({ the: [0, 1, 2], that: [2], in: [0, 2] });

      expect((invertedIndex.searchIndex('the, that,in', 'All'))[2].searchedFile)
        .toEqual('fantasyBook.json');

      expect((invertedIndex.searchIndex('the, that, in', 'All'))[2].title)
        .toEqual(["The 'Alice' in Wonderland",
          'The Lord of the Rings: The Fellowship of the Ring.',
          'The Tower of Babel: Ancient History.']);

      expect((invertedIndex.searchIndex('the, that, in', 'All'))[3].indexes)
        .toEqual({ the: [2], that: [0, 1, 2], in: undefined });

      expect((invertedIndex.searchIndex('the, that,in', 'All'))[3].searchedFile)
        .toEqual('quotesAndRap.json');

      expect((invertedIndex.searchIndex('the, that, in', 'All'))[3].title)
        .toEqual(['Trial and Error', 'Sound of Music.', 'Pfunky']);
    });
  });
});

},{"./test books/capitalTitleKey.json":2,"./test books/fantasyBook.json":3,"./test books/moreThanTwoKeys.json":4,"./test books/notAllTextKeys.json":5,"./test books/notArray.json":6,"./test books/notArrayOfObjects.json":7,"./test books/quotesAndRap.json":8,"./test books/religiousBook.json":9,"./test books/religiousBookIndexes.json":10,"./test books/testsBook.json":11,"./test books/textValueAsNumber.json":12,"./test books/titleValueAsNumber.json":13}],2:[function(require,module,exports){
module.exports=[
  {
    "title": "The 'Alice' in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "Title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }, 
  {
    "title": "The Tower of Babel: Ancient History.",
    "text": "The Tower of Babel is a Near Eastern etiological myth that falls in the first book of the Jewish Tanakh (Genesis); it is meant to explain the origin of different languages."
  }
]
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
module.exports=[
  {
    "title": "The 'Alice' in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination.",
    "Text": "I wish the rest was that she lived happily ever after"
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]
},{}],5:[function(require,module,exports){
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
    "txt": "The Tower of Babel is a Near Eastern etiological myth that falls in the first book of the Jewish Tanakh (Genesis); it is meant to explain the origin of different languages."
  }
]
},{}],6:[function(require,module,exports){
module.exports={
    "title": "The 'Alice' in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
}
},{}],7:[function(require,module,exports){
module.exports=[
  {
    "title": "The 'Alice' in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }, 
  "title","text"
]
},{}],8:[function(require,module,exports){
module.exports=[
  {
    "title": "Trial and Error",
    "text": "That someone does not know something does not mean that one cannot try and maybe succeed."
  },

  {
    "title": "Sound of Music.",
    "text": "When you know that note to sing, you can sing most anything."
  }, 
  {
    "title": "Pfunky",
    "text": "The name is Pfunky, at least that is what they call me, nothing too fancy, just simply funny."
  }
]
},{}],9:[function(require,module,exports){
module.exports=[
  {
    "title": "The Triumphant Church",
    "text": "Christians are already victorious, not militant or defeated!"
  },

  {
    "title": "777",
    "text": "Written by a man considered the most wicked man that ever lived- Allister Crowley"
  }
]
},{}],10:[function(require,module,exports){
module.exports={ 
  "777": [ 1 ], "the": [ 0, 1 ], "triumphant": [ 0 ],"church": [ 0 ],
  "christians": [ 0 ], "are": [ 0 ], "already": [ 0 ], "victorious": [ 0 ],
  "not": [ 0 ], "militant": [ 0 ], "or": [ 0 ], "defeated": [ 0 ],
  "written": [ 1 ], "by": [ 1 ], "a": [ 1 ], "man": [ 1 ], "considered": [ 1 ],
  "most": [ 1 ], "wicked": [ 1 ], "that": [ 1 ], "ever": [ 1 ], "lived": [ 1 ],
  "allister": [ 1 ], "crowley": [ 1 ]
  }
},{}],11:[function(require,module,exports){
module.exports=[
  {
    "title": "Testing",
    "text": "Could be annoying"
  },

  {
    "title": "When tests pass",
    "text": "Could be fulfilling and rewarding"
  }
]
},{}],12:[function(require,module,exports){
module.exports=[
  {
    "title": "The 'Alice' in Wonderland",
    "text": 2
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }, 
  {
    "title": "777",
    "text": "Written by a man considered the most wicked man that ever lived- Allister Crowley"
  }
]
},{}],13:[function(require,module,exports){
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
    "title": 777,
    "text": "Written by a man considered the most wicked man that ever lived- Allister Crowley"
  }
]
},{}]},{},[1])