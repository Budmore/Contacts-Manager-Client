'use strict';
angular.module('contactsModule')
	.controller('RootCtrl', [
	'$scope',
	'$mdSidenav',
	function ($scope, $mdSidenav) {

		/**
		 * Toggle navigation menu (for mobile devices)
		 */
		$scope.openNavigation = function() {
			$mdSidenav('navigation-menu').toggle();
		};

	}]
);
