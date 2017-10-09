angular.module('eStore', ['ui.router'])


.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state("Login", {
        url: "/login",
        templateUrl: "/component/login/login.html"
      })
      .state("Home", {
        url: "/home",
        templateUrl: "/component/home/home.html"
      })

      .state("Inventory", {
        url: "/Inventory",
        templateUrl: "/component/inventory/products.html",
        controller: "productsCtrl"
      })
      .state("ShoppingCart", {
        url: "/Cart",
        templateUrl: "/component/shoppingCart/shoppingCart.html",
      resolve: {
        cart: function(appSrv){
          return appSrv.getCart()            
        }
      },
      controller: "shopCtrl"
      })
      .state("Checkout", {
        url: "/Checkout",
        templateUrl: "/component/checkout/checkout.html"
      })
      .state("Profile", {
        url: "/Profile",
        templateUrl: "/component/profile/profile.html"
      });
      


  });