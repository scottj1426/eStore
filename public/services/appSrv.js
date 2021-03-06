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

    this.addToCart = function(product,authid) {
        console.log("appSrv",product)
        return $http 
        .post('api/cart', {product}).then(function(response){
            console.log("appSrv",response)
            return response.data; 
        })
    }

    this.addToCartById = (details) => {
        console.log("add to cart by id", details)
        return $http 
        .post('api/item', details).then(function(response){
            console.log("appSrv",response)
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
      .put('/api/cart', cart).then(function(response){
          console.log('update cart response:',response);
          return response;
      }).catch(err => console.log(err));
  }


//   this.postTotals = function () {
//       console.log("total grabbed",total)
//       return $http 
//       .post("/api/cart").then(function(response){
//           console.log(response)
//           return response;
//       }).catch(err => console.log(err));
//   }

    this.makePayment = function(payload) {
        return $http.post('/api/payment', payload);
    }

    this.getAuthid = function(){
        return $http.get('/auth/me')
        console.log(response)
    }

    this.cartToOrders = function(cart) {
        return $http.post('/api/orders', cart)
    }

    this.getOrders = function(){
        return $http.get('/api/orders/')
    }

    this.deleteCart = function(cart){
        return $http.delete('/api/deletecart')
    }
   
    

    
    

  

})