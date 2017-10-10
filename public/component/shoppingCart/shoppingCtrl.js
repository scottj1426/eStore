angular.module('eStore').controller('shopCtrl', function($scope, $state, appSrv,cart, $window){
    console.log("shoppingCtrl cart:", cart);
    $scope.cart = cart;

    $scope.totalPrice = function(cart){
        $scope.total = 0;
        cart.forEach(item => {
            $scope.total += (item.price * item.quantity)
        })
        console.log("total:", $scope.total)
        return $scope.total
    }

    $scope.taxTotal = function(total){
        return $scope.tax = (total * 0.0825);
    }

    $scope.finalAmount = function(total,tax){
            return $scope.final = (total + tax); 
    }

    $scope.totalPrice($scope.cart)
    console.log($scope.total)
    $scope.taxTotal($scope.total)
    $scope.finalAmount($scope.total, $scope.tax)


    

    $scope.deleteFromCart = function(item) {
        appSrv.deleteFromCart(item).then(response => {
            $scope.cart = response;
            $scope.totalPrice($scope.cart)
            console.log($scope.total)
            $scope.taxTotal($scope.total)
            $scope.finalAmount($scope.total, $scope.tax)
        })
    } 

    $scope.clearCart = function() {
        appSrv.clearCart().then(response => {
            console.log(response)
            $scope.emptyCart = response;
           
        })
    } 
       
    $scope.updateCart = function(quantity){
        console.log("updateCart Ctrl:", quantity)
        appSrv.updateCart(quantity).then(response => {
            console.log(response)
            $scope.cart.quantity  = response; 
        }).catch(err => console.log(err));
    }

    $scope.reload = () => {
        $window.location.reload();
    }





  

})