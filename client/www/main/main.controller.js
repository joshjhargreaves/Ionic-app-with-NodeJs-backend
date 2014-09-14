'use strict';

angular.module('starter')
.controller('MainCtrl', function (Auth, $scope, $ionicModal, $timeout, $location, 
    $http, $ionicNavBarDelegate, $ionicActionSheet) {
  $scope.loginData = {};
  $scope.user = {};
  $scope.errors = {};
  $scope.hasFocus = false;
  $scope.isCollapsed = true;
  $scope.isLoggedIn = Auth.isLoggedIn;
  $scope.isAdmin = Auth.isAdmin;
  $scope.getCurrentUser = Auth.getCurrentUser;
  //$scope.currentUser = Auth.getCurrentUser();
  console.log($scope.currentUser);
  $scope.hasFocus = false;

  $scope.setFocus = function(){
    $scope.hasFocus = true;
    $ionicNavBarDelegate.setTitle('');
  };

  $scope.noFocus = function(){
    $scope.hasFocus = false;
    var prevTitle = $ionicNavBarDelegate.getPreviousTitle()
    $ionicNavBarDelegate.setTitle(prevTitle);
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

  // Triggered on a button click, or some other target
  $scope.show = function() {
    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      scope: $scope,
      destructiveText: 'Logout',
      titleText: '<b>Logout</b>',
      cancelText: 'Cancel',
      cancel: function() {
        hideSheet();
      },
      buttonClicked: function(index) {
         return true;
      },
      destructiveButtonClicked: function() {
        $scope.logout();
        return true;
      }
    });
  };
});