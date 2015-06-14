'use strict';
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

		$stateProvider
			.state('contacts', {
				title: 'Contacts',
				url: '/contacts',
				templateUrl: 'modules/contacts/views/index.html',
				forLogged: true
			});


	}])

	.run(['$rootScope', 'contactsService', function($rootScope, contactsService) {

		$rootScope.$on('AUTH::LOGOUT', function() {
			$rootScope.isDemoMode = false;

			contactsService.contactsModel.setModel([]);
		});
	}]);
