'use strict';

/**
 * @name contactsClient
 * @description
 * # contactsClient
 *
 * Main module of the application.
 */
angular
	.module('contactsClient', [
		'ngAnimate',
		'ngResource',
		'ngSanitize',
		'ngTouch',
		'ngMaterial',
		'ui.router',

		'globalConfig',
		'contactsModule',
		'generalModule'
	])

	.config(['$urlRouterProvider', '$mdIconProvider',
	function($urlRouterProvider, $mdIconProvider) {
		$urlRouterProvider.otherwise('/');

		$mdIconProvider
			.iconSet('social', 'images/icons/sets/social-icons.svg', 24)
			.iconSet('device', 'images/icons/sets/device-icons.svg', 24)
			.iconSet('communication', 'images/icons/sets/communication-icons.svg', 24)
			.defaultIconSet('images/icons/sets/core-icons.svg', 24);
	}])

	.run(['$rootScope', function($rootScope) {
		$rootScope.$on('$stateChangeSuccess', function (event, currentRoute) {
			$rootScope.pageTitle = currentRoute.title;
		});

	}]);
