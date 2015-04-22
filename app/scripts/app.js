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
		'smart-table'
	])
	.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('mainpage', {
				title: 'Contacts',
				url: '/',
				templateUrl: 'views/contacts.html',
				controller: 'ContactsListCtrl'
			})
			.state('settings', {
				title: 'Settings',
				url: '/settings',
				templateUrl: 'views/settings.html',
				// controller: 'AboutCtrl'
			});

	}])

	.run(['$rootScope', function($rootScope) {
		$rootScope.$on('$stateChangeSuccess', function (event, currentRoute) {
			$rootScope.pageTitle = currentRoute.title;
		});

	}]);
