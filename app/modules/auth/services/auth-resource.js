'use strict';

angular
	.module('authModule.services')
	.factory('authResource', ['$resource', 'GLOBAL_SETTINGS', function($resource, GLOBAL_SETTINGS) {
			var REQUEST_URL = GLOBAL_SETTINGS.BASE_URL + GLOBAL_SETTINGS.API_VERSION;

			return $resource( REQUEST_URL + '/auth/:action',
				{
					action: '@action'
				},
				{

					login: {
						method: 'POST',
						params: {
							action: 'login'
						}
					},

					register: {
						method: 'POST',
						params: {
							action: 'register'
						}
					},

					checkToken: {
						method: 'GET',
						params: {
							action: 'me'
						}
					}


				}
			);


	}]);
