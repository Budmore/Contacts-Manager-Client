/**
 * @name contactsClient
 * @description
 * # contactsClient
 *
 * Contacts module. Manage all your contacts. CRUD contacts
 */

angular
	.module('contactsModule', [
		'ngResource',
		'ui.router'
	])

	.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
		'use strict';

		$stateProvider
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

	}]);
