'use strict';

/**
 * @ngdoc function
 * @name contactsModule.controller:AddContactCtrl
 */
angular.module('contactsModule')
	.controller('SingleContactCtrl',[
	'$rootScope',
	'$scope',
	'$mdToast',
	'$mdSidenav',
	'contactsService',
	function ($rootScope, $scope, $mdToast, $mdSidenav, contactsService) {

		/**
		 * Available dates type.
		 * @type {Array}
		 */
		$scope.dateTypes = [{
			name: 'birthdate',
			type: 'BIRTHDATE'
		},{
			name: 'namedate',
			type: 'NAMEDATE'
		},{
			name: 'event',
			type: 'EVENT'
		}];







		/**
		 * Push specific dateType to the model
		 * @param {string} dateTyp
		 * @param {object} model
		 */
		$scope.addDate = function(dateType, model) {
			if (!model) {
				return;
			}

			var _date = {
				type: dateType
			};

			if (model.dates && model.dates.constructor === Array) {
				model.dates.push(_date);
			}

		};

		/**
		 * Remove item from anny array. Find item in array with "indexOf" and
		 * splice it.
		 *
		 * @param  {object} item
		 * @param  {array} array
		 */
		$scope.removeItemFromArray = function(item, array) {
			var index = array.indexOf(item);
			if (index !== -1) {
				array.splice(index, 1);
			}
		};



		/**
		 * Create new contact. if request is pending enable spinner.
		 * @param  {object} contact
		 */
		$scope.createContact = function(contact) {
			$scope.showSpinner = true;
			$scope.isError = false;


			contactsService.createContact(contact).then(
				function success(response) {

					contactsService.contactsModel.addToModel(response);

					$mdToast.show(
						$mdToast.simple()
							.content('Contact created')
							.position('top right')
							.hideDelay(1500)
					);


					$scope.closePanel();

				}, function error() {
					$scope.isError = true;
				}
			).finally(function() {
				$scope.showSpinner = false;
			});
		};



		/**
		 * Update contact. Required contact._id
		 * promise resolved (success) - refresh contact in the contactsList
		 * promise rejected (error) - show error notification
		 *
		 * @param  {object} contact
		 */
		$scope.updateContact = function(contact) {
			$scope.showSpinner = true;
			$scope.isError = false;


			contactsService.updateContact(contact).then(
				function success(response) {

					contactsService.contactsModel.updateItemById(response);

					$mdToast.show(
						$mdToast.simple()
							.content('Updated successfully')
							.position('top right')
							.hideDelay(1500)
					);

					$scope.closePanel();

				}, function error() {
					$scope.isError = true;
				}
			).finally(function() {
				$scope.showSpinner = false;
			});
		};

		/**
		 * Create or Update contact. Depending on whether contact has _id
		 * @param  {object} contact
		 */
		$scope.saveContact = function(contact) {

			if (contact._id) {
				$scope.updateContact(contact);
			} else {
				$scope.createContact(contact);
			}

		};



		/**
		 * Close panel and clear the form. single-contact template
		 */
		$scope.closePanel = function() {
			$mdSidenav('single-contact').close();
		};

		/**
		 * Remove contact from model (not from DB). Display toast with "Undo"
		 * option. User has 5sec to cancel remove action. After this time remove
		 * contact from DB.
		 *
		 * @param {object} contact
		 */
		$scope.askBeforeRemove = function(contact) {
			$scope.closePanel();

			var toast = $mdToast.simple()
				.content('The contact has been removed.')
				.position('top right')
				.hideDelay(5000)
				.action('Undo?')
				.highlightAction(true)


			contactsService.contactsModel.removeItemById(contact);


			$mdToast.show(toast).then(
				function restoreContact() {
					contactsService.contactsModel.addToModel(contact);
				}, function removeContact() {
					$scope.removeContact(contact)
				}
			);


		}



	}]);
