'use strict';

angular.module('starter')
  .controller('LoginCtrl', function ($scope, $state, Auth, $location, $window, Config) {
    $scope.user = {};
    $scope.errors = {};
    $scope.test = "testing";
    var loginWindow, hasToken, url;

    $scope.login = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      console.log(window.cordova);
      if(!window.cordova) {
        $window.location.href = '/auth/' + provider;
      } else {
        url = Config.apiBase + '/auth/' + provider;
        loginWindow = $window.open(url, '_blank', 'location=no,toolbar=no,hidden=no');
        loginWindow.addEventListener('loadstart', function (event) {
          hasToken = event.url.indexOf('?code=');
          if(hasToken > -1) {
            loginWindow.close();
            $location.path('/');
          }
        })
      }
    };
  });
