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
		'smart-table',

		'globalConfig',
		'contactsModule'
	])

	.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('settings', {
				title: 'Settings',
				url: '/settings',
				templateUrl: 'modules/main/views/settings.html',
			});

	}])

	.run(['$rootScope', function($rootScope) {
		$rootScope.$on('$stateChangeSuccess', function (event, currentRoute) {
			$rootScope.pageTitle = currentRoute.title;
		});

	}]);
