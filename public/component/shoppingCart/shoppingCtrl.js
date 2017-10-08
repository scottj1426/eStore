angular.module('eStore').controller('shopCtrl', function($scope, $state, appSrv,cart){
    console.log(cart);
    $scope.cart = cart;



    $scope.deleteFromCart = function(item) {
        appSrv.deleteFromCart(item).then(response => {
            $scope.cart = response;
            alert('item deleted');
        })
    } 
})