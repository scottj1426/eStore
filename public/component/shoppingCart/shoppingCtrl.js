angular.module('eStore').controller('shopCtrl', function($scope, $state, appSrv,cart){
    console.log(cart);
    $scope.cart = cart;
})