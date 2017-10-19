angular.module('eStore', ['ui.router', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache'])


.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state("Login", {
        url: "/login",
        templateUrl: "/component/login/login.html",
        controller: "loginCtrl"
      })
      .state("Home", {
        url: "/",
        templateUrl: "/component/home/home.html",
        controller: "homeCtrl",
        resolve: {
          user: loginSrvc => loginSrvc.getUser()
              .then(response => response.data)
              .catch(err => err)
        }
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
      // .state("Checkout", {
      //   url: "/Checkout",
      //   templateUrl: "/component/checkout/checkout.html"
      // })
      .state("Profile", {
        url: "/Profile/",
        templateUrl: "/component/profile/profile.html",
        controller: "profileCtrl"
      })
      .state("item", {
        url: "/products/:id",
        templateUrl: "/component/itemDetails/itemDetails.html",
      
        controller: "itemDetailsCtrl"
      })
      


  });