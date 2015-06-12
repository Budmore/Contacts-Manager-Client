angular.module('demoModule')
	.controller('DemoContactsListCtrl', [
	'$rootScope',
	'$scope',
	'$http',
	'$mdSidenav',
	'contactsService',
	function($rootScope, $scope, $http, $mdSidenav, contactsService) {
		'use strict';

		var REQUEST_URL = '/modules/demo/mocked/scientists-list.json';

		$scope.contactsList = contactsService.contactsModel.getModel();

		$scope.init = function() {
			var model = $scope.contactsList && $scope.contactsList.data;

			if (model && model.length === 0) {
				$scope.getContacts();
			}
		};


		$scope.getContacts = function() {
			$http.get(REQUEST_URL)
				.success(function(response) {

					response.data.map(function(item) {
						item._id = Math.random().toString(36).substring(2);
					});

					var _parsed = contactsService.parseAllDates(response.data);
					contactsService.contactsModel.setModel(_parsed);
					$scope.sortByType();
				});
		};

		/**
		 * Remove contact from model
		 */
		$scope.removeContact = function(contact) {
			if (!contact) {
				return;
			}

			contactsService.contactsModel.removeItemById(contact);

		};

		/**
		 * Open panel with empty contact form
		 */
		$scope.openPanel = function() {
			$scope.contact = {
				dates: [{
					type: 'BIRTHDATE'
				}]
			};
			$mdSidenav('single-contact').open();
		};

		/**
		 * Open panel with contact form
		 * @param  {object} contact
		 */
		$scope.goToContact = function(contact) {
			var _contactCopy = angular.copy(contact);

			_contactCopy.dates.map(function(item) {
				item.date = new Date(item.date);
			});


			$scope.contact = _contactCopy;
			$mdSidenav('single-contact').open();
		};




		$scope.sortByType = function(type) {
			var model = contactsService.contactsModel.getModel();
			var dateOfReference = new Date();

			switch(type) {
				case 'UPCOMING_DATE':
					model.data.sort(contactsService.upcomingDates(dateOfReference));
					break;

				default:
					model.data.sort(contactsService.upcomingDates(dateOfReference));

			}

		};

	}]
);
