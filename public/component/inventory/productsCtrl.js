angular.module('eStore').controller('productsCtrl', function($scope, $state, appSrv){
appSrv.getData().then(response => {
    console.log(response);
    $scope.products = response;
    $scope.addToCart = function(product) {
        appSrv.addToCart(product).then(response => {
            alert('success');
        })
    }
})
})