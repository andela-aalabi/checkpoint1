/* global angular, InvertedIndex, document, toastr*/
const invApp = angular.module('invIndex', []);

toastr.options.timeOut = 2500;
toastr.options.closeButton = true;
toastr.options.preventDuplicates = true;
toastr.options.closeMethod = 'fadeOut';

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
          if (invIndex.validateFile(JSON.parse(fileContent))) {
            scope.filesRead[doc.files[i].name] = fileContent;
            if (!(scope.uploadedFiles.includes(doc.files[i].name))) {
              scope.$apply(scope.uploadedFiles.push(doc.files[i].name));
            }
          } else {
            toastr.error('invalide file format');
          }
        } else {
          toastr.error(`${doc.files[i].name} is not json`);
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

  scope.getIndex = (filename) => {
    try {
      const titles = [];
      const file = JSON.parse(scope.filesRead[filename]);
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
    } catch (e) {
      toastr.info('Please select a file to get indexed');
    }
  };

  scope.searchIndex = () => {
    try {
      if (!scope.fileToSearch) {
        throw new Error('Please select a file to search');
      }
      if (!scope.selectedSearch) {
        throw new Error('Please type in word(s) to search for');
      }
      const response = invIndex.searchIndex(scope.selectedSearch, scope.fileToSearch);
      if (response === false) {
        throw new Error('Please type word(s) to search for and not symbols');
      }
      scope.search = response;
      scope.showIndex = false;
    } catch (e) {
      toastr.error(e);
    }
  };

  document.getElementById('upload').addEventListener('change', scope.readFile);
}]);
