angular.module('userModule.controllers', ['ngMaterial'])
	.controller('UserCtrl', [
	'$rootScope',
	'$scope',
	'$mdToast',
	'userService',
	function($rootScope, $scope, $mdToast, userService) {
		'use strict';


		/**
		 * Get user by id
		 * @param  {string} userId
		 */
		$scope.getUserById = function(userId) {

			if (!userId) {
				return;
			}

			$scope.isPending = true;
			$scope.isError = false;

			var param = {
				_id: userId
			};

			userService.getUserById(param).then(
				function getUserByIdSuccess(response) {
					userService.userModel.setModel(response);

				}, function getUserByIdError() {

					$scope.isError = true;

				}
			).finally(function() {
				$scope.isPending = false;
			});

		};


		/**
		 * Update user,
		 * @param {string} userId
		 */
		$scope.updateUser = function(userId) {
			if (!userId) {
				return;
			}

			$scope.isPending = true;
			$scope.isError = false;

			var param = {
				_id: userId
			};

			userService.updateUser(param).then(
				function getUserByIdSuccess(response) {
					userService.userModel.setModel(response);
					$mdToast.show(
						$mdToast.simple()
						.content('The user has been updated')
					);
				}, function getUserByIdError() {
					$mdToast.show(
						$mdToast.simple().content('Could not complete your request')
					);
					$scope.isError = true;

				}
			).finally(function() {
				$scope.isPending = false;
			});

		};



		/**
		 * Remove user,
		 * @param {string} userId
		 * @param {string} password
		 */
		$scope.removeUser = function(userId, password) {
			if (!userId || !password) {
				return;
			}

			$scope.isPending = true;
			$scope.isError = false;

			var param = {
				_id: userId,
				password: password
			};

			userService.removeUser(param).then(
				function getUserByIdSuccess() {
					$rootScope.$broadcast('AUTH::LOGOUT');
					$mdToast.show(
						$mdToast.simple().content('You successfully remove user.')
					);
				}, function getUserByIdError() {
					$mdToast.show(
						$mdToast.simple().content('Could not complete your request. Did you write correct password?')
					);
					$scope.isError = true;
				}
			).finally(function() {
				$scope.isPending = false;
			});

		};





	}]);
