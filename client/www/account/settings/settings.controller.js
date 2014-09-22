'use strict';

angular.module('starter')
  .controller('SettingsCtrl', function ($scope, User, Auth, $timeout) {
    $scope.errors = {};
    $scope.items = [];
    console.log('Settings controller');
    $scope.items = [0,1,2,3,4,5];
    $timeout(function() {
      //$scope.items = [1,2,3,4,5];
    }, 1000);
    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};

    $scope.doRefresh = function() {
      $timeout( function() {
        //simulate async response
        //$scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      
      }, 1000);
    };
  });
