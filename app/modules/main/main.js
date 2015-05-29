'use strict';

/**
 * @ngdoc function
 * @name contactsClient.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the contactsClient
 */
angular.module('contactsClient')
	.controller('MainCtrl', [
        '$scope',
        '$mdSidenav',
    function ($scope, $mdSidenav) {
		// $rootScope.breadCrumps = {
		// 	title: 'Contacts1'
		// };
		$scope.openNavigation = function() {
			$mdSidenav('navigation-menu').toggle();
		};


	}]
);

