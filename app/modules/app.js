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

	.config(['$urlRouterProvider', '$stateProvider', '$mdIconProvider',
	function($urlRouterProvider, $stateProvider, $mdIconProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('settings', {
				title: 'Settings',
				url: '/settings',
				templateUrl: 'modules/main/views/settings.html',
			});

		$mdIconProvider
			.iconSet('social', 'images/icons/social-icons.svg', 24)
			.iconSet('device', 'images/icons/device-icons.svg', 24)
			.iconSet('communication', 'images/icons/communication-icons.svg', 24)
			.defaultIconSet('images/icons/core-icons.svg', 24);
	}])

	.run(['$rootScope', function($rootScope) {
		$rootScope.$on('$stateChangeSuccess', function (event, currentRoute) {
			$rootScope.pageTitle = currentRoute.title;
		});

	}]);
