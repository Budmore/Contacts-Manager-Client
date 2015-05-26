'use strict';

/**
 * @ngdoc overview
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

		'contactsModule'
	])

	.constant('GLOBAL_SETTINGS', {
		BASE_URL: 'http://localhost:9010'
	})

	.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('settings', {
				title: 'Settings',
				url: '/settings',
				templateUrl: 'modules/main/views/settings.html',
			})
			.state('contacts', {
				title: 'Contacts',
				url: '/contacts',
				templateUrl: 'modules/contacts/views/contacts.html',
			})
			.state('create-contact', {
				title: 'Create contact',
				url: '/contacts/create',
				templateUrl: 'modules/contacts/views/create-contact.html',
			});

	}])

	.run(['$rootScope', function($rootScope) {
		$rootScope.$on('$stateChangeSuccess', function (event, currentRoute) {
			$rootScope.pageTitle = currentRoute.title;
		});

	}]);
