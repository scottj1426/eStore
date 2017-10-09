angular.module('eStore').controller('productsCtrl', function($scope, $state, appSrv){
appSrv.getData().then(response => {
    console.log("getData",response);
    $scope.products = response;
    $scope.addToCart = function(product) {
        console.log("addToCart",product)
        appSrv.addToCart(product).then(response => {
        })
    }

    
     
 })
})
