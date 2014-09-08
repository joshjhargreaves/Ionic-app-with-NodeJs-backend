'use strict';

angular.module('starter')
	.factory('Config', function() {
		var apiBase = window.cordova? "http://fullstack.joshhargreav.es" : "";
	  return {
	      apiBase : apiBase
	  };
	});