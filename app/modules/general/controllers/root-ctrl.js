angular.module('generalModule')
	.controller('RootCtrl', [
	'$scope',
	'$mdSidenav',
	function ($scope, $mdSidenav) {
		'use strict';

		/**
		 * Toggle navigation menu (for mobile devices)
		 */
		$scope.openNavigation = function() {
			$mdSidenav('navigation-menu').toggle();
		};

	}]
);
