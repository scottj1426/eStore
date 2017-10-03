angular.module('eStore', ['ui.router'])


.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state("Login", {
        url: "/login",
        templateUrl: "/public/component/login/login.html"
      })
      .state("Home", {
        url: "/home",
        templateUrl: "/public/component/home/home.html"
      })

      .state("Inventory", {
        url: "/Inventory",
        templateUrl: "/public/component/inventory/products.html"
      })
      .state("ShoppingCart", {
        url: "/Cart",
        templateUrl: "/public/component/shoppingCart/shoppingCart.html"
      })
      .state("Checkout", {
        url: "/Checkout",
        templateUrl: "/public/component/checkout/checkout.html"
      })
      .state("Profile", {
        url: "/Profile",
        templateUrl: "/public/component/profile/profile.html"
      });
      


  });