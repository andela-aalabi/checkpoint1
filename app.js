const invApp = angular.module('invIndex', []);

invApp.controller('invController', ['$scope', ($scope) => {
  const scope = $scope;
  scope.filesRead = {};
  scope.uploadedFiles = [];

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
    const file = JSON.parse(scope.filesRead[filename]);
    if (invIndex.validateFile(file)) {
      const indices = invIndex.getIndex(file, filename);
      console.log(indices);

      scope.showIndex = true;
      scope.indexed = [
        {
          indexes: indices,
          documents: invIndex.getDocuments(fileChoice),
          indexedFile: fileChoice
        },
      ];
    } else {
      console.log('invalide file format');
    }
  };
}]);
