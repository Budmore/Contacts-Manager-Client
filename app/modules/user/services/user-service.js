
'use strict';

angular
	.module('userModule.services')
	.service('userService', ['$q', 'userResource', function ($q, userResource) {

		function ModelConstructor() {

			var model = {
				data: []
			};

			return {
				/**
				 * Getter - get private variable with refferance to the data
				 * @return {Object}
				 */
				getModel: function() {
					return model;
				},

				/**
				 * Setter - update only model property (old refference still exists)
				 * @param {*} newModel
				 */
				setModel: function(newModel) {
					model.data = newModel;
					return;
				},
				/**
				 * Push data to the model at the begining of the array (unshift)
				 * @param {*} item
				 */
				addToModel: function(item) {
					if (model.data.constructor === Array) {
						model.data.unshift(item);
					}
					return;
				},

				/**
				 * Update data in the model by replacing old object with new one.
				 * @param  {Object} item
				 */
				updateItemById: function(item) {
					if (!item || !item._id) {
						return;
					}

					var index;
					index = _.findIndex(model.data, '_id', item._id );

					if (index > -1) {
						model.data.splice(index, 1, item);
					}

					return;
				},

				/**
				 * Remove data from the model by "item._id"
				 * @param  {Object} item
				 */
				removeItemById: function(item) {
					if (!item || !item._id) {
						return;
					}

					var index;
					index = _.findIndex(model.data, '_id', item._id);

					if (index > -1) {
						model.data.splice(index, 1);
					}

					return;
				}

			};
		}

		this.userModel = new ModelConstructor();


		/**
		 * Get user by token (in the request headers)
		 * @return {object} dfd Promise
		 */

		this.getUser = function() {
			var dfd = $q.defer();

			userResource.getUser(
				function getUserSuccess(data) {
					dfd.resolve(data);
				}, function getUserError(error) {
					dfd.reject(error);
				}
			);

			return dfd.promise;
		};


		/**
		 * Update user. Required user._id
		 * @param  {object} user
		 * @return {object} dfd Promise
		 */
		this.updateUser = function(user) {
			var dfd = $q.defer();

			userResource.updateUser(user,
				function createUserSuccess(data) {
					dfd.resolve(data);
				}, function createUserError(error) {
					dfd.reject(error);
				}
			);

			return dfd.promise;
		};


		/**
		 * Remove user. Required user.password && user._id
		 * @param  {object} user
		 * @return {object} dfd Promise
		 */
		this.removeUser = function(user) {
			var dfd = $q.defer();

			userResource.removeUser(null, user,
				function createUserSuccess(data) {
					dfd.resolve(data);
				}, function createUserError(error) {
					dfd.reject(error);
				}
			);

			return dfd.promise;
		};


	}]);
