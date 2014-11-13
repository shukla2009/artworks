'use strict';

angular.module('artworksApp', [ 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'ui.bootstrap' ]).config(function($routeProvider, $httpProvider) {
	delete $httpProvider.defaults.headers.post['X-Requested-With'];
	delete $httpProvider.defaults.headers.post['Content-type'];
	$routeProvider.when('/', {
		templateUrl : 'views/main.html',
		controller : 'MainCtrl'
	}).otherwise({
		redirectTo : '/'
	});

});
