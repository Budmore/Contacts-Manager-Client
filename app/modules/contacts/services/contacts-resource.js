'use strict';

angular
	.module('contactsModule')
	.factory('contactsResource', ['$resource', 'GLOBAL_SETTINGS', function($resource, GLOBAL_SETTINGS) {
			var REQUEST_URL = GLOBAL_SETTINGS.BASE_URL + GLOBAL_SETTINGS.API_VERSION;

			return $resource( REQUEST_URL + '/contacts/:action/:id',
				{
					action: '@action',
					id: '@_id'
				},
				{

					getContacts: {
						method: 'GET'
					},

					createContact: {
						method: 'POST'
					},

					removeContact: {
						method: 'DELETE'
					},

					updateContact: {
						method: 'PUT'
					}

				}
			);


	}]);
