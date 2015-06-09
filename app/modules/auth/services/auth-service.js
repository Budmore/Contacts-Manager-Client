
'use strict';

angular
	.module('authModule')
	.service('authService', [
    '$q',
    'authResource',
    'sessionService',
    function ($q, authResource, sessionService) {



		/**
		 * Login user with credentials.
		 * On success store token in to the localStorage.
		 *
		 * @param  {object} user (user.email, user.password)
		 * @return {object} dfd Promise
		 */
		this.login = function(user) {
			var dfd = $q.defer();

			authResource.login(user,
				function loginSuccess(response) {

					if (response && response.token) {
						sessionService.setSession(response.token);
					}


					dfd.resolve(response);
				}, function loginError(error) {
					dfd.reject(error);
				}
			);

			return dfd.promise;
		};


		/**
		 * Register user
		 * On success store token in to the localStorage.
		 *
		 * @param  {object} user (user.email, user.password)
		 * @return {object} dfd Promise
		 */
		this.register = function(user) {
			var dfd = $q.defer();

			authResource.register(user,
				function registerSuccess(response) {

					if (response && response.token) {
						sessionService.setSession(response.token);
					}

					dfd.resolve(response);
				}, function registerError(error) {
					dfd.reject(error);
				}
			);

			return dfd.promise;
		};

		/**
		 * Check is token valid, on error clear session.
		 *
		 * @return {object} dfd Promise
		 */
		this.checkToken = function() {
			var dfd = $q.defer();

			authResource.checkToken(
				function createContactSuccess(response) {

					if (response && response.token) {
						sessionService.setSession(response.token);
					}

					dfd.resolve(response);
				}, function createContactError(error) {
					sessionService.clearSession();
					dfd.reject(error);
				}
			);

			return dfd.promise;
		};



	}]);
