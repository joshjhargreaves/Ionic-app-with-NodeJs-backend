'use strict';

angular.module('fullstackApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('client', {
      	url: '/client',
      	templateUrl: 'app/templates/test.html',
      	controller: 'AppCtrl'
      })
  });