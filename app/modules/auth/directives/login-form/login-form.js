angular.module('authModule.directives')

	.directive('loginForm', function() {
		'use strict';



		return {
			restrict: 'E',
			templateUrl: 'modules/auth/directives/login-form/login-form.html',
			controller: 'AuthCtrl',

		};
	}
);
