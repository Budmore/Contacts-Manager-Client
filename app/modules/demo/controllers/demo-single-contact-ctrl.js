'use strict';

/**
 * @ngdoc function
 * @name contactsModule.controller:AddContactCtrl
 */
angular.module('demoModule')
	.controller('DemoSingleContactCtrl',[
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
		$scope.dateTypes = contactsService.dateTypes;





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
		 * Create new mocked contact.
		 * @param  {object} contact
		 */
		$scope.createContact = function(contact) {

			contact._id = Math.random().toString(36).substring(2);

			contactsService.contactsModel.addToModel(contact);

			$mdToast.show(
				$mdToast.simple()
					.content('Contact created')
					.position('top right')
					.hideDelay(1500)
			);

		};



		/**
		 * Update contact. Required contact._id
		 * promise resolved (success) - refresh contact in the contactsList
		 * promise rejected (error) - show error notification
		 *
		 * @param  {object} contact
		 */
		$scope.updateContact = function(contact) {



			contactsService.contactsModel.updateItemById(contact);

			$mdToast.show(
				$mdToast.simple()
					.content('Updated successfully')
					.position('top right')
					.hideDelay(1500)
			);

			$scope.closePanel();


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
				.highlightAction(true);


			contactsService.contactsModel.removeItemById(contact);


			$mdToast.show(toast).then(
				function restoreContact() {
					contactsService.contactsModel.addToModel(contact);
				}, function removeContact() {
					$scope.removeContact(contact);
				}
			);


		};



	}]);
