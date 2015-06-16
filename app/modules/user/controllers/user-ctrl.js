angular.module('userModule.controllers', ['ngMaterial'])
	.controller('UserCtrl', [
	'$rootScope',
	'$scope',
	'$mdToast',
	'userService',
	function($rootScope, $scope, $mdToast, userService) {
		'use strict';


		/**
		 * Get user by token (in the request headers)
		 */
		$scope.getUser = function() {

			$scope.isPending = true;
			$scope.isError = false;


			userService.getUser().then(
				function getUserSuccess(response) {
					userService.userModel.setModel(response);

				}, function getUserError() {

					$scope.isError = true;

				}
			).finally(function() {
				$scope.isPending = false;
			});

		};


		/**
		 * Update user. Required user._id
		 * @param {string} userId
		 */
		$scope.updateUser = function(user) {
			if (!user || !user._id) {
				return;
			}

			$scope.isPending = true;
			$scope.isError = false;


			userService.updateUser(user).then(
				function updateUserSuccess(response) {
					userService.userModel.setModel(response);
					$mdToast.show(
						$mdToast.simple()
						.content('The user has been updated')
					);
				}, function updateUserError() {
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
		 * Remove user. Required user.password && user._id
		 * @param {string} user
		 */
		$scope.removeUser = function(user) {
			if (!user || !user._id || !user.password) {
				return;
			}

			$scope.isPending = true;
			$scope.isError = false;


			userService.removeUser(user).then(
				function removeUserSuccess() {
					$rootScope.$broadcast('AUTH::LOGOUT');
					$mdToast.show(
						$mdToast.simple().content('You successfully remove user.')
					);
				}, function removeUserError() {
					$mdToast.show(
						$mdToast.simple().content('Could not complete your request. Did you write correct password?')
					);
					$scope.isError = true;
				}
			).finally(function() {
				$scope.isPending = false;
			});

		};




		var mockedUser = {
			email: 'j.mach@budmore.pl',
			phone: 501502503,
			emailNotifications: [
				'j.mach@budmore.pl',
				'darth.vader@gmail.com',
				'linus.torvalds@gmail.com'
			],
			notifications: {
				daily: false,
				weekly: true
			}

		};


		$scope.init = function() {

			if ($rootScope.isDemoMode) {
				$scope.user = mockedUser;
				return;
			}




			$scope.user = userService.userModel.getModel();

			$scope.getUser();

		};


	}]);
