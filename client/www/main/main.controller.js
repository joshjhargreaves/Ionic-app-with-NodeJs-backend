'use strict';

angular.module('starter')
.controller('MainCtrl', function (Auth, $scope, $ionicModal, $timeout, $location, $http) {
  $scope.loginData = {};
  $scope.user = {};
  $scope.errors = {};

  $scope.isCollapsed = true;
  $scope.isLoggedIn = Auth.isLoggedIn;
  $scope.isAdmin = Auth.isAdmin;
  $scope.getCurrentUser = Auth.getCurrentUser;
  var currentUser = Auth.getCurrentUser();
  if(currentUser && currentUser.facebook) {
    $http({method: 'GET', url: 'http://graph.facebook.com/' + currentUser.facebook.id + '/picture'}).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(data);
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  }

  $scope.logout = function() {
    Auth.logout();
    $location.path('/login');
  };

  $scope.isActive = function(route) {
    return route === $location.path();
  };
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    Auth.login($scope.loginData)
    .then( function() {
      // Logged in, redirect to home
      $location.path('/');
    })
    .catch( function(err) {
      $scope.errors.other = err.message;
      console.log(err.message);
    });


    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})