angular
.module("eStore")
.controller("itemDetailsCtrl", function($scope, $stateParams, appSrv) {
  $scope.test ="test"
  console.log($stateParams)
    appSrv.getItem($stateParams.id).then(response => {
      $scope.details = response[0];
      console.log($scope.details)
    });

});