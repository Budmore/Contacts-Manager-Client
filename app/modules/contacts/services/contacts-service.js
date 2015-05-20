'use strict';

angular
	.module('contactsModule')
	.service('contactsService', ['$q', 'contactsResource', function ($q, contactsResource) {

		//var self = this;

		this.getContacts = function() {
			var dfd = $q.defer();

			contactsResource.getContacts(
				function getContactsSuccess(data) {
					dfd.resolve(data);
				}, function getContactsError(error) {
					dfd.reject(error);
				}
			);

			return dfd.promise;
		};

		/**
		 * Get contact by id
		 * @param {string} contactId
		 * @return {object} dfd Promise
		 */
		this.getContactById = function(contactId) {
			var dfd = $q.defer();

			var params = {
				id: contactId
			};

			contactsResource.getContacts( params,
				function getContactByIdSuccess(data) {
					dfd.resolve(data);
				}, function getContactByIdError(error) {
					dfd.reject(error);
				}
			);

			return dfd.promise;
		};



	}]);
