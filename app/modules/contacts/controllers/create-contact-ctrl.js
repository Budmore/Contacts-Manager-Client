'use strict';

/**
 * @ngdoc function
 * @name contactsModule.controller:AddContactCtrl
 */
angular.module('contactsModule')
	.controller('CreateContactCtrl',[
	'$rootScope',
	'$scope',
	'contactsService',

	function ($rootScope, $scope, contactsService) {

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
		 * Push specyfic dateType to the model
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


		var _contact = {
			firstname: '',
			lastname: '',
			dates: [
				{}
			]
		};

		$scope.contact = angular.copy(_contact);

		/**
		 * Remove item from anny array. Find item in array with "indexOf" and
		 * Find and splice it.
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
				function success(data) {
					$scope.contact = data;
				}, function error() {
					$scope.isError = true;
				}
			).finally(function() {
				$scope.showSpinner = false;
			});
		};


	}]);
