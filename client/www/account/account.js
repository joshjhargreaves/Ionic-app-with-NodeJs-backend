'use strict';

angular.module('starter')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        templateUrl: "account/login/loginForm.html",
        controller: 'LoginCtrl'
      })
      .state('login.main', {
        url: '/login'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'account/signup/signupForm.html',
        controller: 'SignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'www/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  });