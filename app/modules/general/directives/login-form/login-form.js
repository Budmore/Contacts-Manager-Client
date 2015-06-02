angular.module('generalModule')
	.controller('LoginFormCtrl', [
    '$rootScope',
    '$scope',
    '$location',
     function($rootScope, $scope, $location) {
		'use strict';
		$scope.user = {};

		$scope.loginAsGuest = function() {
			$rootScope.isLogged = true;
			$location.path('contacts');
		};
	}])

	.directive('loginForm', function() {
		'use strict';



		return {
			restrict: 'E',
			templateUrl: 'modules/general/directives/login-form/login-form.html',
			controller: 'LoginFormCtrl',

		};
	}
);
