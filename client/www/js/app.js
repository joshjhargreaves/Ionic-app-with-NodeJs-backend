// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic', 
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io'
  ])

.run(function($ionicPlatform, $rootScope, Auth, $location, $state) {
  // Redirect to login if route requires auth and you're not logged in
  $rootScope.$on('$stateChangeStart', function (event, next) {
    Auth.isLoggedInAsync(function(loggedIn) {
      if (next.authenticate && !loggedIn) {
        event.preventDefault();
        //$location.path('/login');
        $state.go('app.login');
      }
    });
  });

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');

          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "main/main.html",
      controller: 'MainCtrl'
    })

    .state('app.search', {
      url: "^/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      },
      authenticate: true
    })

    .state('app.browse', {
      url: "^/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html",
        }
      }
    })

    .state('app.playlists', {
      url: "^/playlists",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      },
    })
    
  // use the HTML5 History API
  //$locationProvider.html5Mode(true);
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('playlists');
  $httpProvider.interceptors.push('authInterceptor');
});




