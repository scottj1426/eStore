angular.module('eStore').controller('profileCtrl', function($scope, $state, appSrv,$stateParams){


        appSrv.getOrders().then(response => {
            $scope.orders = response.data; 
            console.log(response.data)
        })

        // $scope.totalPrice = function(orders){
        //     $scope.total = 0;
        //     cart.forEach(order => {
        //         $scope.total += (order.price * order.quantity)
        //     })
    
    })