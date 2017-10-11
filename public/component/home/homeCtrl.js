angular.module('eStore').controller('homeCtrl', function($scope, user) {
    // user comes from resolve, will either be the user obj or error message we send from server
    console.log(user);
    // if user.data and user.data.err then user = err
    // else user = user object from database
    $scope.user = user.data && user.data.err ? user.data.err : user;
})
