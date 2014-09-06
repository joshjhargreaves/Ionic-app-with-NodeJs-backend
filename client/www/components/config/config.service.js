'use strict';

angular.module('starter')
	.factory('ConfigService', function() {
		var apiBase = window.cordova? "http://fullstack.joshhargreav.es" : "";
	  return {
	      apiBase : apiBase
	  };
	});