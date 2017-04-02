const invApp = angular.module('invIndex', []);

invApp.controller('invController', ['$scope', ($scope) => {
  const scope = $scope;
  scope.filesRead = {};
  scope.uploadedFiles = [];
  scope.count = 0;

  const invIndex = new InvertedIndex();
  scope.allIndexed = invIndex.allIndexed;

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
    scope.titles = [];
    const file = JSON.parse(scope.filesRead[filename]);
    if (invIndex.validateFile(file)) {
      file.forEach(obj => scope.titles.push(obj.title));
      const indices = invIndex.getIndex(file, filename);
      console.log(indices);
      const documents = [];
      for (let i = 0; i < scope.titles.length; i += 1) {
        documents.push(i);
      }
      scope.showIndex = true;
      scope.indexed = [
        { indexes: indices,
          docs: documents,
          indexedFile: scope.selectedFile,
        },
      ];
      scope.count += 1;
    } else {
      console.log('invalide file format');
    }
  };
}]);
