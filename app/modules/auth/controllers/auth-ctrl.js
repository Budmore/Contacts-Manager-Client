'use strict';
angular.module('authModule.controllers')
	.controller('AuthCtrl', [
    '$rootScope',
	'$scope',
	'$location',
	'authService',
	'sessionService',
	function($rootScope, $scope, $location, authService, sessionService) {

		$scope.user = {};

		$scope.loginAsGuest = function() {
			$location.path('/');
			sessionService.setSession('demo-mode');
			$rootScope.isDemoMode = true;
		};

		/**
		 * Login user
		 * @param  {Object} user Credentials "user.email" and "user.password"
		 */
		$scope.login = function(user) {
			if (!user || !user.email || !user.password) {
				// @TODO: validate email and password
				return;
			}

			$scope.isPending = true;
			$scope.isError = false;

			authService.login(user).then(
				function loginSuccess(response) {

					if (response && response.token) {
						sessionService.setSession(response.token);
						$location.path('/');
					} else {
						//@TODO: error handler
						$scope.isError = true;
					}

				}, function loginError() {

					//@TODO: error handler
					$scope.isError = true;
				}
			).finally(function() {
				$scope.isPending = false;
			});

		};



		/**
		 * Register user. On success log him in.
		 * @param  {Object} user Credentials "user.email" and "user.password"
		 */
		$scope.register = function(user) {
			if (!user || !user.email || !user.password) {
				// @TODO: validate email and password
				return;
			}

			$scope.isPending = true;
			$scope.isError = false;

			authService.register(user).then(
				function registerSuccess(response) {

					if (response && response.token) {
						sessionService.setSession(response.token);
						$location.path('/');

					} else {
						//@TODO: error handler
						$scope.isError = true;
					}

				}, function registerError() {
					//@TODO: error handler
					$scope.isError = true;
				}
			).finally(function() {
				$scope.isPending = false;
			});

		};

		/**
		 * Clear the session
		 */
		$rootScope.logout = function() {
			$rootScope.$broadcast('AUTH::LOGOUT');
		};


		/**
		 * When user click on the form remove error "invalid credentials"
		 */
		$scope.clearError = function() {
			$scope.isError = false;
		};

	}]);
