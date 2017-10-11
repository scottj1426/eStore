angular
.module("eStore")
.controller("itemDetailsCtrl", function($scope, $stateParams, appSrv) {
  
  console.log($stateParams)
  $scope.getData = function() {
    appSrv.getItem($stateParams.id).then(response => {
      $scope.details = response[0];
      console.log(response)
    });
  };

$scope.getData();
});