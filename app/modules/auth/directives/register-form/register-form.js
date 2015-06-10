angular.module('authModule.directives')

	.directive('registerForm', function() {
		'use strict';



		return {
			restrict: 'E',
			templateUrl: 'modules/auth/directives/register-form/register-form.html',
			controller: 'AuthCtrl',

		};
	}
);
