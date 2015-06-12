'use strict';

/**
 * @ngdoc function
 * @name contactsModule.controller:ContactsListCtrl
 * @description
 * # ContactsListCtrl
 * Controller of the contactsModule
 */
angular.module('contactsModule')
	.controller('ContactsListCtrl', [
	'$scope',
	'$mdSidenav',
	'contactsService',
	function ($scope, $mdSidenav, contactsService) {

		$scope.filters = {
			show: false
		};

		$scope.contactsList = contactsService.contactsModel.getModel();

		$scope.init = function() {
			$scope.getContacts();
		};

		/**
		 * Get all contacts (promise from service contactsService)
		 * promise resolved (success) - render contact list at the view
		 * promise rejected (error) - show error notification
		 */
		$scope.getContacts = function() {
			$scope.isError = false;
			$scope.showSpinner = true;

			contactsService.getContacts().then(
				function success(response) {
					contactsService.contactsModel.setModel(response.data);
					$scope.sortByType();
				}, function error() {
					$scope.isError = true;
				}
			).finally(function(){
				$scope.showSpinner = false;
			});
		};


		/**
		 * Remove contact
		 * promise resolved (success) - remove contact from the contactsList
		 * promise rejected (error) - show error notification
		 */
		$scope.removeContact = function(contact) {
			if (!contact) {
				return;
			}

			$scope.showSpinner = true;
			$scope.isError = false;

			contactsService.removeContact(contact).then(
				function success() {
					contactsService.contactsModel.removeItemById(contact);
				}, function error() {
					$scope.isError = true;
				}
			).finally(function(){
				$scope.showSpinner = false;
			});
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


	}]);
