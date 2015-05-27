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


		$scope.contactsList = [];

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
					$scope.contactsList = response.data;
					$scope.displayedCollection = [].concat($scope.contactsList);
				}, function error() {
					$scope.isError = true;
				}
			).finally(function(){
				$scope.showSpinner = false;
			});
		};

		/**
		 * Update contact
		 * promise resolved (success) - refresh contact in the contactsList
		 * promise rejected (error) - show error notification
		 */
		$scope.updateContact = function(contact) {
			if (!contact) {
				return;
			}

			$scope.showSpinner = true;
			$scope.isError = false;

			contactsService.updateContact(contact).then(
				function success() {
					// @TODO: refresh contact in the contactsList
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
					var index = $scope.contactsList.indexOf(contact);
					if (index !== -1) {
						$scope.contactsList.splice(index, 1);
					}

				}, function error() {
					$scope.isError = true;
				}
			).finally(function(){
				$scope.showSpinner = false;
			});
		};





		/**
		 * Build handler to open/close a SideNav; when animation finishes
		 * report completion in console
		 * @param {string} navID Element attribute id=""
		 */
		function buildToggler(navID) {
			var debounceFn = $mdUtil.debounce(function(){
				$mdSidenav(navID)
					.toggle()
					.then(function () {
					});
				}, 200);
			return debounceFn;
		}

		$scope.toggleContactForm = buildToggler('single-contact');


		$scope.goToContact = function(contact, $event) {
			$scope.selectedContact = angular.copy(contact);


		};

	}]);
