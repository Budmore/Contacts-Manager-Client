/**
 * Contacts module. Manage all your contacts (CRUD)
 */

angular
	.module('contactsModule', [
		'ngResource',
		'ui.router'
	])

	.config(['$urlRouterProvider', '$stateProvider',
	function($urlRouterProvider, $stateProvider) {
		'use strict';

		$stateProvider
			.state('contacts', {
				title: 'Contacts',
				url: '/contacts',
				templateUrl: 'modules/contacts/views/contacts.html',
				forLogged: true
			});


	}]);
