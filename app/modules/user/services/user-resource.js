'use strict';

angular
	.module('userModule.services')
	.factory('userResource', ['$resource', 'GLOBAL_SETTINGS', function($resource, GLOBAL_SETTINGS) {
			var REQUEST_URL = GLOBAL_SETTINGS.BASE_URL + GLOBAL_SETTINGS.API_VERSION;

			return $resource( REQUEST_URL + '/user/:action/:_id',
				{
					action: '@action',
					_id: '@_id'
				},
				{

					getUser: {
						method: 'GET'
					},

					removeUser: {
						method: 'DELETE'
					},

					updateUser: {
						method: 'PUT'
					}

				}
			);


	}]);
