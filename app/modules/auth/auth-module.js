'use strict';

/**
 * General module with common code.
 */

angular
	.module('authModule', [
		'ngResource',
		'ui.router',
	])

	.config(['$stateProvider',
	function($stateProvider) {

		$stateProvider
			.state('login', {
				title: 'Login',
				url: '/login',
				templateUrl: 'modules/general/views/settings.html',
			});
			// .state('todo', {
			// 	title: '@ToDo',
			// 	url: '/todo',
			// 	templateUrl: 'modules/general/views/todo.html',
			// });
	}]);
/*
	.run([
	'$rootScope',
	'sessionService',
	'authService',
	function($rootScope, sessionService, authService) {

		$rootScope.appReady = false;
		$rootScope.isLogged = sessionService.getSession().isLogged;

		var hasToken = sessionService.checkSession();
		console.log(hasToken);
		if (hasToken && hasToken.token) {

			authService.checkToken().then(
				function checkTokenSuccess() {

					sessionService.setSession(hasToken.token);

				}, function checkTokenError() {

					sessionService.clearSession();

				}
			).finally(function() {
				$rootScope.appReady = true;
			});

		}


	}]);
*/


