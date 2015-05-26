'use strict';

angular
	.module('contactsModule')
	.factory('contactsResource', ['$resource', 'GLOBAL_SETTINGS', function($resource, GLOBAL_SETTINGS) {

			return $resource( GLOBAL_SETTINGS.BASE_URL + '/contacts/:action/:id',
				{
					action: '@action',
					id: '@id'
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
