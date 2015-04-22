'use strict';

/**
 * @ngdoc function
 * @name contactsClient.controller:ContactsListCtrl
 * @description
 * # ContactsListCtrl
 * Controller of the contactsClient
 */
angular.module('contactsClient')
	.controller('ContactsListCtrl',['$rootScope', '$scope', function ($scope, $rootScope) {

		$rootScope.test = 'lorem';

		var someDate = new Date();
		var _contact = {
			firstname: 'Jakub',
			lastname: 'Mach',
			nickname: 'Budmore',
			notes: 'is Awesome!',
			email: 'j.mach@budmore.pl',
			url: 'http://budmore.pl',
			dates: [
				{
					type: 'BIRTHDATE',
					date: someDate,
					year: someDate.getFullYear(),
					month: someDate.getMonth(),
					day: someDate.getDate()
				}
			]
		};

		var _contact1 = angular.copy(_contact);
		var _contact2 = angular.copy(_contact);
		var _contact3 = angular.copy(_contact);

		$scope.contactsList = [_contact1, _contact2, _contact3];

	}]);
