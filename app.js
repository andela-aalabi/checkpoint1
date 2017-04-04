/* global angular, InvertedIndex, document*/
const invApp = angular.module('invIndex', []);

invApp.controller('invController', ['$scope', ($scope) => {
  const scope = $scope;
  scope.filesRead = {};
  scope.uploadedFiles = [];
  scope.count = 0;
  scope.filesIndexed = {};

  const invIndex = new InvertedIndex();

  scope.readFile = (files) => {
    const doc = files.target;
    for (let i = 0; i < doc.files.length; i += 1) {
      invIndex.readFile(doc.files[i]).then((fileContent) => {
        if (scope.validateJson(fileContent)) {
          scope.filesRead[doc.files[i].name] = fileContent;
          if (!(scope.uploadedFiles.includes(doc.files[i].name))) {
            scope.$apply(scope.uploadedFiles.push(doc.files[i].name));
          }
        } else {
          console.log(`${doc.files[i].name} is not json`);
        }
      });
    }
  };

  scope.validateJson = (filename) => {
    try {
      JSON.parse(filename);
      return true;
    } catch (e) {
      return false;
    }
  };

  document.getElementById('upload').addEventListener('change', scope.readFile);

  scope.getIndex = (filename) => {
    const titles = [];
    const file = JSON.parse(scope.filesRead[filename]);
    if (invIndex.validateFile(file)) {
      file.forEach(obj => titles.push(obj.title));
      const indices = invIndex.getIndex(file, filename);
      const documents = [];
      for (let i = 0; i < titles.length; i += 1) {
        documents.push(i);
      }
      scope.showIndex = true;
      scope.indexed = [
        { indexes: indices,
          docs: documents,
          indexedFile: scope.selectedFile,
          title: titles,
        },
      ];
      scope.count += 1;
      scope.filesIndexed[filename] = scope.indexed;
    } else {
      console.log('invalide file format');
    }
  };

  const searchIndexOneFile = () => {
    const cleanedTerms = invIndex.tokenize(scope.selectedSearch);
    const result = {};
    cleanedTerms.forEach((term) => {
      const found = invIndex.searchIndex(term, scope.fileSearch);
      if (found !== false) {
        result[term] = found;
      }
    });

    const titles = [];
    const file = JSON.parse(scope.filesRead[scope.fileSearch]);
    file.forEach(obj => titles.push(obj.title));
    const documents = [];
    for (let i = 0; i < titles.length; i += 1) {
      documents.push(i);
    }
    scope.search.push({
      indexes: result,
      docs: documents,
      searchedFile: scope.fileSearch,
      title: titles,
    });
    console.log(scope.search[0].indexes);

    scope.showIndex = false;
  };

  scope.searchIndex = () => {
    scope.search = [];
    if (scope.fileToSearch === 'All') {
      const all = Object.keys(scope.filesIndexed);
      console.log(all);
      all.forEach((file) => {
        scope.fileSearch = file;
        searchIndexOneFile();
      });
    } else {
      scope.fileSearch = scope.fileToSearch;
      searchIndexOneFile();
    }
  };
}]);
