angular.module('eStore').controller('shopCtrl', function($scope, $state, appSrv,cart){
    console.log("shoppingCtrl cart:", cart);
    $scope.cart = cart;

    $scope.deleteFromCart = function(item) {
        appSrv.deleteFromCart(item).then(response => {
            $scope.cart = response;
        })
    } 

    $scope.clearCart = function() {
        appSrv.clearCart().then(response => {
            console.log(response)
            $scope.emptyCart = response;
            alert('Cart is Clear');
        })
    } 
        //delete if not needed in future
    $scope.updateQuantity = function(){
        appSrv.updateQuantity(quantity).then(response => {
            console.log(response)
            $scope.quantity  = response; 
            
        })
    }




  

})