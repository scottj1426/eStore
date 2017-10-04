angular.module('eStore').service('appSrv', function($http){

    this.getData = function(){
        return $http
        .get('/api/products').then(function(response){
            console.log(response);
            return response.data;
        })
    }


})