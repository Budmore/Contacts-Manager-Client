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
	'$mdUtil',
	'$mdSidenav',
	'contactsService',
    function ($scope, $mdUtil, $mdSidenav, contactsService) {


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



		$scope.openPanel = function() {
			$mdSidenav('single-contact').open();

			$scope.contact = {
				dates: [{
					type: 'BIRTHDATE'
				}]
			};
		};

		$scope.goToContact = function(contact) {
			$scope.contact = angular.copy(contact);

			$mdSidenav('single-contact').open();


		};

	}]);
