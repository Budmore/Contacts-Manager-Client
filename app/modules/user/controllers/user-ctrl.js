angular.module('userModule.controllers', ['ngMaterial'])
	.controller('UserCtrl', [
	'$rootScope',
	'$scope',
	'$mdToast',
	'userService',
	function($rootScope, $scope, $mdToast, userService) {
		'use strict';



		function validEmails(emails) {
			var result;
			var regEx = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

			result = emails.filter(function(email) {
				return regEx.test(email);
			});

			return result;
		}



		/**
		 * Get user by token (in the request headers)
		 */
		$scope.getUser = function() {

			$scope.isPending = true;
			$scope.isError = false;


			userService.getUser().then(
				function getUserSuccess(response) {
					userService.userModel.setModel(response);
					$scope.user = angular.copy(response);
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
						.position('top right')
					);
				}, function updateUserError() {
					$mdToast.show(
						$mdToast.simple()
						.content('Could not complete your request')
						.position('top right')
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
						$mdToast.simple()
						.content('You successfully remove user.')
						.position('top right')
					);
				}, function removeUserError() {
					$mdToast.show(
						$mdToast.simple()
						.content('Could not complete your request. Did you write correct password?')
						.position('top right')
					);
					$scope.isError = true;
				}
			).finally(function() {
				$scope.isPending = false;
			});

		};




		var mockedUser = {
			email: 'demo@budmore.pl',
			phone: '0 700 88 01 88',
			recipients:{
				emails: [
					'j.mach@budmore.pl',
					'darth.vader@gmail.com',
					'linus.torvalds@gmail.com'
				],
				phones: []
			},
			notificationsTypes: {
				email: true,
				sms: false
			}

		};


		$scope.init = function() {

			if ($rootScope.isDemoMode) {
				$scope.user = angular.copy(mockedUser);
				return;
			}


			$scope.getUser();

		};

		$scope.revert = function() {
			var userModel = userService.userModel.getModel();
			$scope.user = angular.copy(userModel.data);

			if ($rootScope.isDemoMode) {
				$scope.user = angular.copy(mockedUser);
			}

		};

		$scope.saveUser = function(user) {
			user.recipients.emails = validEmails(user.recipients.emails);

			$scope.updateUser(user);
		};


	}]);
