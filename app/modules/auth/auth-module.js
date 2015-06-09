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
		'use strict';

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
	}])
	.run(['$rootScope', function($rootScope) {
		'use strict';

		$rootScope.pageLoaded = true;
		$rootScope.isLogged = false;

	}]);
