'use strict';

angular
	.module('userModule.services')
	.factory('userResource', ['$resource', 'GLOBAL_SETTINGS', function($resource, GLOBAL_SETTINGS) {
			var REQUEST_URL = GLOBAL_SETTINGS.BASE_URL + GLOBAL_SETTINGS.API_VERSION;

			return $resource( REQUEST_URL + '/:action/:_id',
				{
					action: '@action',
					_id: '@_id'
				},
				{

					getUser: {
						method: 'GET',
						params: {
							action: 'user'
						}
					},

					removeUser: {
						method: 'DELETE',
						params: {
							action: 'users'
						}
					},

					updateUser: {
						method: 'PUT',
						params: {
							action: 'users'
						}
					}

				}
			);


	}]);
