
'use strict';

angular
	.module('contactsModule')
	.service('contactsService', ['$q', 'contactsResource', function ($q, contactsResource) {

		/**
		 * Get all contacts
		 * @return {object} dfd Promise
		 */
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

			contactsResource.getContacts(params,
				function getContactByIdSuccess(data) {
					dfd.resolve(data);
				}, function getContactByIdError(error) {
					dfd.reject(error);
				}
			);

			return dfd.promise;
		};

		/**
		 * Create contact. Required contact._id
		 * @param  {object} contact
		 * @return {object} dfd Promise
		 */
		this.createContact = function(contact) {
			var dfd = $q.defer();

			contactsResource.createContact(contact,
				function createContactSuccess(data) {
					dfd.resolve(data);
				}, function createContactError(error) {
					dfd.reject(error);
				}
			);

			return dfd.promise;
		};

		/**
		 * Update contact. Required contact._id
		 * @param  {object} contact
		 * @return {object} dfd Promise
		 */
		this.updateContact = function(contact) {
			var dfd = $q.defer();

			contactsResource.updateContact(contact,
				function createContactSuccess(data) {
					dfd.resolve(data);
				}, function createContactError(error) {
					dfd.reject(error);
				}
			);

			return dfd.promise;
		};


		/**
		 * Remove contact. Required contact._id
		 * @param  {object} contact
		 * @return {object} dfd Promise
		 */
		this.removeContact = function(contact) {
			var dfd = $q.defer();

			contactsResource.removeContact(null, contact,
				function createContactSuccess(data) {
					dfd.resolve(data);
				}, function createContactError(error) {
					dfd.reject(error);
				}
			);

			return dfd.promise;
		};

	}]);
