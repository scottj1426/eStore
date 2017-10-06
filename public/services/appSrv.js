angular.module('eStore').service('appSrv', function($http){

    this.getData = function(){
        return $http
        .get('/api/products').then(function(response){
            console.log(response);
            return response.data;
        })
    }

    this.addToCart = function(product) {
        return $http 
        .post('api/cart', {product}).then(function(response){
            console.log(response)
            return response.data; 
        })
    }
    this.getCart = function() {
        console.log("hey")
        return $http 
        .get('/api/cart').then(function(response){
            console.log(response.data)
            return response.data; 
        }).catch(err => console.log(err));
    }

  

})