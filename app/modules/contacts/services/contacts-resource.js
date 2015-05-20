'use strict';

angular
	.module('contactsModule')
	.factory('contactsResource', ['$resource', function($resource) {

			var globalSettings = {
				baseUrl: 'http://localhost:8000'
			};

			return $resource( globalSettings.baseUrl + '/contacts/:action/:id',
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
