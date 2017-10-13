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
       
    $scope.updateCart = function(cart){
        console.log("updateCart Ctrl:", cart)
        appSrv.updateCart(cart).then(response => {
            console.log(response)
            $scope.cart.quantity  = response; 
        }).catch(err => console.log(err));
    }

    $scope.reload = () => {
        $window.location.reload();
    }

    $scope.openPayment = function(name, desc) {
        var handler = window.StripeCheckout.configure({
            key: 'pk_test_AcVYHno8m2zXni1DEdMDF2hL',
            locale: 'auto',
            token: function(token) {
                var payload = {
                    token: token,
                    total: $scope.final * 100,

                }
                appSrv.makePayment(payload).then(function(response) {
                    console.log(response);
                });
            }
        });

        handler.open({
            name: 'Jimmys\' Reptiles',
            description: "Items",
            amount: $scope.final * 100
        });
    }





  

})