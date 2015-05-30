/**
 * General module with common code.
 */
angular
	.module('generalModule', [
		'ui.router',
		'ngMaterial',
	])

	.config(['$stateProvider',
	function($stateProvider) {
		'use strict';

		$stateProvider
			.state('settings', {
				title: 'Settings',
				url: '/settings',
				templateUrl: 'modules/general/views/settings.html',
			})
			.state('todo', {
				title: '@ToDo',
				url: '/todo',
				templateUrl: 'modules/general/views/todo.html',
			});
	}]);
