angular.module('eStore').service('appSrv', function($http){

    this.getData = function(){
        return $http
        .get('/api/products').then(function(response){
            console.log(response);
            return response.data;
        })
    }

    this.getItem = function(id){
        return $http
        .get('/api/products/' + id).then(function(response){
            console.log(response);
            return response.data;
        })
    }

    this.addToCart = function(product) {
        console.log("appSrv", product)
        return $http 
        .post('api/cart', {product}).then(function(response){
            console.log(response)
            return response.data; 
        })
    }
    this.getCart = function() {
    
        return $http 
        .get('/api/cart').then(function(response){
            console.log("getCart",response.data)
            return response.data; 
        }).catch(err => console.log(err));
    }


    this.deleteFromCart = function(id) {
        return $http 
        .delete('/api/cart/' + id).then(function(response){
            console.log(response.data)
            return response.data; 
        }).catch(err => console.log(err));
    }

    this.clearCart = function() {
        return $http 
        .delete('/api/cart').then(function(response){
            console.log(response.data)
            return response.data;
        }).catch(err => console.log(err));
    }

  this.updateCart = function (cart) {
      console.log("Service",cart)
      return $http
      .put('/api/cart/' + cart[0].quantity).then(function(response){
          console.log(response);
          return response;
      }).catch(err => console.log(err));
  }

    
   
    

    
    

  

})