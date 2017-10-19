angular.module('eStore').controller('productsCtrl', function($scope, $state, appSrv){
appSrv.getData().then(response => {
    console.log("getData",response);
    $scope.products = response;
    $scope.addToCart = function(product) {
        console.log("addToCart",product)
        appSrv.addToCart(product).then(response => {
        })
    }
   //get request to pull authid from users
   appSrv.getAuthid().then(function(response){
    console.log(response.data.authid)
    $scope.authid = response.data.authid;
})
    
     
 })
})
