
'use strict';

angular
	.module('contactsModule')
	.service('contactsService', ['$q', 'contactsResource', function ($q, contactsResource) {


		/**
		 * Loop over every date.
		 * Replace eg. '1920-11-10T23:00:00.000Z' to JavaScript Date object
		 *
		 * @param  {Array} dates
		 * @return {Array}
		 */
		function parseAllDates(dates) {
			if (dates && dates.constructor === Array) {
				dates.forEach(function(date) {

					if ( date && moment(date.date).isValid()) {
						date.date = new Date(date.date);
					}

				});
			}



			return dates;
		}


		/**
		 * Get all contacts. Then loop over every contact and parse dates.
		 * @return {object} dfd Promise
		 */
		this.getContacts = function() {
			var dfd = $q.defer();

			contactsResource.getContacts(
				function getContactsSuccess(response) {

					if (response && response.data) {

						response.data.forEach(function(contact){
							if (contact.dates) {
								parseAllDates(contact.dates);
							}
						});

					}


					dfd.resolve(response);
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
