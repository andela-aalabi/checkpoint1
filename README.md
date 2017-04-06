[![Build Status](https://travis-ci.org/andela-aalabi/checkpoint1.svg?branch=master)](https://travis-ci.org/andela-aalabi/checkpoint1)
[![Coverage Status](https://coveralls.io/repos/github/andela-aalabi/checkpoint1/badge.svg)](https://coveralls.io/github/andela-aalabi/checkpoint1)


# Inverted Index
Elastic search uses a structure called an inverted index, which is designed to allow very fast full-text searches. An inverted index consists of a list of all the unique words that appear in any document, and for each word, a list of the documents in which it appears.

#### Features
- Accepts multiple Upload of JSON files in below format:
```
[
  {
    "title": "This is a sample title",
    "text": "And this is a sample text"
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]
```
- Creates Index of all objects with 'title' and 'text' keys in the uploaded file.
- Allows multiple search through the created indexes(i.e. search multiple words in multiple files all at once).

#### How to use
The Application is available:
- On the internet via [https://inverted-index-pfunky.herokuapp.com/](https://inverted-index-pfunky.herokuapp.com/)
- Also available on any local machine after the following steps:
    ```
    git clone https://github.com/andela-aalabi/checkpoint1.git
    ```

    * Navigate to the 'checkpoint1' directory in your terminal/console

    * Install all the dependencies (you must already have installed [Nodejs](nodejs.org)):

    ```
    npm install
    ```

    - Run Tests for the application with:

    ```
    npm test
    ```

  - Start the Application with:
  ```
    npm start
    ```


#### The application was built using the following Technologies and Services:
- Gulp
- Karma
- Jasmine
- Travis CI
- Coveralls
- Hound CI

#### Limitation of the application
- The application distinguishes plural forms of words from their singular forms. It also does not distinguishes the different tenses of verbs.
