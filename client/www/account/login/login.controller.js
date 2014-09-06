'use strict';

angular.module('starter')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};
    $scope.test = "testing";
    var baseUrl = window.cordova ? "http://joshhargreav.es" : "http://localhost:8080" 

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
      if(!window.cordova) {
        $window.location.href = '/auth/' + provider;
      } else {
        var loginWindow, hasToken, url;
        url = baseUrl + '/auth/' + provider;
        loginWindow = $window.open(url, '_blank', 'location=no,toolbar=no,hidden=yes');
        loginWindow.addEventListener('loadstart', function (event) {
          hasToken = event.url.indexOf('?code=');
          if(hasToken > -1) {
            loginWindow.close();
          }
        })
      }
    };
  });
