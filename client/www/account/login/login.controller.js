'use strict';

angular.module('starter')
  .controller('LoginCtrl', function ($scope, $state, Auth, $location, $window, Config, $cookieStore, $cordovaNetwork, $cordovaToast) {
    $scope.user = {};
    $scope.errors = {};
    var loginWindow, token, hasToken, url;
    $scope.isOnline = window.cordova? $cordovaNetwork.isOnline() : true;

    $scope.login = function(form) {
      if($scope.isOnline) {
        $scope.submitted = true;
        console.log($scope.user.email);
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
      }
    };

    $scope.loginOauth = function(provider) {
      if(!window.cordova) {
        $window.location.href = '/auth/' + provider;
      } else {
        url = Config.apiBase + '/auth/' + provider;
        loginWindow = $window.open(url, '_blank', 'location=no,toolbar=no,hidden=no');
        loginWindow.addEventListener('loadstart', function (event) {
          hasToken = event.url.indexOf('?oauth_token=');
          if(hasToken > -1) {
            token = event.url.match("oauth_token=(.*)")[1];
            loginWindow.close();
            Auth.updateUserAndToken(token);
            $location.path('/');
          }
        })
      }
    };
  });
