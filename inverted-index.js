/**
 * The Inverted Index class
 */
class InvertedIndex {

  /**
   * Constructor initializes indexes as an empty object
   * and keeps track of the files that have been indexed
   * @constructor
   */
  constructor() {
    this.allIndexed = {};
  }

  /**
   * Create Index
   * createIndex method takes a single document and builds an index from it
   * @param {Object} file - the file to be indexed
   * @return {Object} the file with words indexed
   */
  createIndex(file, filename) {
    const indexed = {};
    file.forEach((obj, index) => {
      let text = `${obj.title} ${obj.text}`;
      text = this.tokenize(text);
      text.forEach((word) => {
        if (!(word in indexed)) {
          indexed[word] = [(index + 1)];
        } else if (!(indexed[word].includes(index + 1))) {
          indexed[word].push(index + 1);
        }
      });
    });
    this.allIndexed[filename] = indexed;
    return indexed;
  }

  /**
   * Get Index
   * getIndex method gets the indexed file with words from documents that were
   * found. If the file is not indexed, it calls the create index method
   * @param {Object} file
   * @return {Object} the file with words indexed
   */
  getIndex(file, filename) {
    if (filename in this.allIndexed) {
      return this.allIndexed[filename];
    }
    return this.createIndex(file, filename);
  }

   /**
   * tokenize method removes special characters and returns an array of words
   * @param {string} text - the text to be tokenized
   * @return {array} array of words in the documents
  */
  tokenize(text) {
    this.text = text;
    let cleanWords = this.text.replace(/[^\w\s]/gi, '');
    cleanWords = cleanWords.replace(/\s+/g, ' ').toLowerCase();
    return cleanWords.split(' ');
  }

  /**
   * validateFile method ensures all the documents in a file are valid i.e.
   * they should be arrays of objects that have only title and text keys
   * and Strings as value
   * @param {Object} file - the uploaded and read file
   * @return {Bool} true or false if the method was successful or not
  */
  validateFile(file) {
    this.file = file;
    if (Array.isArray(this.file)) {
      for (let item = 0; item < this.file.length; item += 1) {
        if ((typeof this.file[item]) !== 'object') {
          return false;
        }
        if (Object.keys(this.file[item]).length !== 2 ||
            Object.keys(this.file[item])[0] !== 'title' ||
            Object.keys(this.file[item])[1] !== 'text') {
          return false;
        }
        if ((typeof this.file[item].title) !== 'string' ||
            (typeof this.file[item].text) !== 'string') {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  /**
   * readFile method reads the data from the file being uploaded
   * @param {JSON} fileData - the uploaded file
   * @return {String} string of text in the uploaded file
  */
  readFile(fileData) {
    this.fileData = fileData;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = e => reject(`Error reading + ${this.fileData.name}: ${e.target.result}`);
      reader.readAsText(this.fileData);
    });
  }

  /**
   * readFile method reads the data from the file being uploaded
   * @param {String} word - word that one is searching for
   * @param {Object} file - specific file to search through
   * @return {String} string of text in the uploaded file
  */
  static searchIndex(word, file) {
    if (file === 'all') {
      const filesIndexedDocs = Object.keys(this.filesIndexed);
      filesIndexedDocs.forEach((doc) => {
        console.log(doc, this.filesIndexed[doc][word]);
      });
    }
    const location = this.getIndex(file);
    // for ()
    return location[word];
  }
}

// readFile: Reads the data from the file being uploaded
// validateFile: Ensures all the documents in a particular file are valid
// tokenize: Strips out special characters from documents to be indexed
// createIndex: Creates the index for documents
// getIndex: Get’s indices created for particular files
// searchIndex: Searches through one or more indices for words

module.exports = InvertedIndex;
