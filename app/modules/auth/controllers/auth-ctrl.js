'use strict';
angular.module('authModule.controllers')
	.controller('AuthCtrl', [
	'$scope',
	'authService',
	'sessionService',
	function($scope, authService, sessionService) {


		/**
		 * Login user
		 * @param  {Object} user Credentials "user.email" and "user.password"
		 */
		$scope.login = function(user) {
			if (!user) {
				// @TODO: validate email and password
				return;
			}

			$scope.isPending = true;
			$scope.isError = false;

			authService.login(user).then(
				function loginSuccess(response) {

					if (response && response.token) {
						sessionService.setSession(response.token);

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
			if (!user) {
				// @TODO: validate email and password
				return;
			}

			$scope.isPending = true;
			$scope.isError = false;

			authService.register(user).then(
				function registerSuccess(response) {

					if (response && response.token) {
						sessionService.setSession(response.token);

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



	}]);
