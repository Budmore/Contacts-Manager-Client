/**
 * General module with common code.
 */

angular
	.module('generalModule', [
		'ngResource',
		'ui.router',
		'ngMaterial'
	])

	.config(['$stateProvider',
	function($stateProvider) {
		'use strict';

		$stateProvider
			.state('todo', {
				title: '@ToDo',
				url: '/todo',
				templateUrl: 'modules/general/views/todo.html',
				forLogged: true
			});
	}]);

