
'use strict';

angular
	.module('authModule')
	.service('sessionService', ['$http', function ($http) {
		var self = this;

		var session = {
			isLogged: false
		};

		/**
		 * Get user session. Return private object.
		 *
		 * Hint: If you return object and update only its properties,
		 * then you keep reference to this object.
		 *
		 * @return {Object} session
		 */
		this.getSession = function() {
			return session;
		};



		/**
		 * Set user session. Update property of.
		 *
 		 * Hint: If you update only property of session object,
		 * then every else where is getSession() will automatically update.
		 * Because they keep reference to this object.
		 *
		 * @param {String} token
		 */
		this.setSession = function(token) {
			session.isLogged = true;
			localStorage.setItem('token', token);
			self.setHeaders(token);
		};



		/**
		 * Clear user session.
		 * Remove token from localStorage and clear $http headers
		 */
		this.clearSession = function() {
			session.isLogged = false;
			localStorage.removeItem('token');
			self.clearHeaders();
		};



		/**
		 * Check user session. If token exists setup $http headers
		 *
		 * @return {Object} result
		 */
		this.checkSession = function() {
			var result = {
				token: false
			};

			var token = localStorage.getItem('token');

			if (token) {
				self.setHeaders(token);
				result.token = token;
			}

			return result;
		};



		/**
		 * Set token as a $http header ('x-access-token').
		 * @param {String} token
		 */
		this.setHeaders = function(token) {
			$http.defaults.headers.common['x-access-token'] = token;
		};



		/**
		 * Remove 'x-access-token' from the $http headers
		 */
		this.clearHeaders = function() {
			delete $http.defaults.headers.common['x-access-token'];
		};





	}]);
