angular.module('generalModule')
	.controller('SettingsCtrl', [
	'$scope',
	function ($scope) {
		'use strict';


		$scope.user = {
			email: 'j.mach@budmore.pl',
			phone: 501502503,
			emailNotifications: [
				'j.mach@budmore.pl',
				'jakub@budmore.pl',
				'j.mach@gaminglive.tv',
			],
			notifications: {
				daily: false,
				weekly: true
			}

		};
		var userCopy = angular.copy($scope.user);


		$scope.revert = function() {
			var temp = angular.copy(userCopy);
			angular.extend($scope.user, temp);
		}



		$scope.saveUser = function(user) {
			user.emailNotifications = validEmails(user.emailNotifications);

			userCopy = angular.copy($scope.user);
		}

		function validEmails(emails) {
			var result;
			var regEx = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

			result = emails.filter(function(email) {
				return regEx.test(email);
			});

			return result
		}

	}]
);
