/**
 * User module. Manage user data like notification recipients.
 */

angular.module('userModule', [
		'ui.router',
		'userModule.controllers',
		'userModule.services'
	])

	.config(['$stateProvider',	function($stateProvider) {
		'use strict';

		$stateProvider
			.state('settings', {
				title: 'Settings',
				url: '/settings',
				templateUrl: 'modules/user/views/settings.html',
				forLogged: true
			});

	}]);
