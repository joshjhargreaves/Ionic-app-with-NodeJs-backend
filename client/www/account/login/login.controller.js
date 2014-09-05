'use strict';

angular.module('starter')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};
    $scope.test = "testing";
    //TODO changed this url to be defined in config somewhere
    var baseUrl = "http://fullstack.joshhargreav.es/playlists"

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
      $window.location.href = '/auth/' + provider;
      if(cordova) {
        var url = baseUrl + '/auth/' + provider;
        loginWindow = $window.open(url, '_blank', 'location=no,toolbar=no,hidden=yes');
        loginWindow.addEventListener('loadstart', function(event) {
          loginWindow.close;
        })
      }
    };
  });
