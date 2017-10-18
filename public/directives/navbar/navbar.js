

angular.module('eStore').directive('navbar', function() {
    return {
        templateUrl: '/directives/navbar/navbar.html',
        retrict: 'E',
        controller: function($scope, $timeout, $mdSidenav){
            $scope.toggleLeft = buildToggler('left');
            $scope.toggleRight = buildToggler('right');
        
            function buildToggler(componentId) {
              return function() {
                $mdSidenav(componentId).toggle();
              };
            }
        }
    }    
    });


