angular
.module("eStore")
.controller("itemDetailsCtrl", function($scope, $stateParams, appSrv, $rootScope) {
    

    appSrv.getItem($stateParams.id).then(response => {
      $scope.details = response[0];
      console.log($scope.details)
    });
    

    $scope.addToCartById = (details) => {
      console.log("detailsCtrl" , details)
      appSrv.addToCartById(details)
      .then(response => {
          console.log("add to cart by id", response)
      })   
    }


});