describe('userModule.services:', function() {
	'use strict';
	var $httpBackend, userService, successCb, errorCb, REQUEST_URL;


	beforeEach(module('userModule.services'));
	beforeEach(module('globalConfig'));

	beforeEach(inject(function($injector) {
		var GLOBAL_SETTINGS = $injector.get('GLOBAL_SETTINGS');
		REQUEST_URL = GLOBAL_SETTINGS.BASE_URL + GLOBAL_SETTINGS.API_VERSION;

		$httpBackend = $injector.get('$httpBackend');
		userService = $injector.get('userService');

		successCb = jasmine.createSpy();
		errorCb = jasmine.createSpy();
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	describe('"userService"', function() {



		it('should getUserById() GET', function() {
			var mocked = {
				_id: '123sad123'
			};

			$httpBackend.expectGET(REQUEST_URL + '/users/' + mocked._id).respond(200, {});
			userService.getUserById(mocked._id).then(successCb, errorCb);
			$httpBackend.flush();
			expect(successCb).toHaveBeenCalled();

			$httpBackend.expectGET(REQUEST_URL + '/users/' + mocked._id).respond(404, {});
			userService.getUserById(mocked._id).then(successCb, errorCb);
			$httpBackend.flush();
			expect(errorCb).toHaveBeenCalled();
		});


		it('should updateUser() PUT', function() {
			var mocked = {
				_id: 'as12ba',
				firstName: 'Jakub',
				lastName: 'Mach'
			};

			$httpBackend.expectPUT(REQUEST_URL + '/users/' + mocked._id).respond(200, {});
			userService.updateUser(mocked).then(successCb, errorCb);
			$httpBackend.flush();
			expect(successCb).toHaveBeenCalled();

			$httpBackend.expectPUT(REQUEST_URL + '/users/' + mocked._id).respond(404, {});
			userService.updateUser(mocked).then(successCb, errorCb);
			$httpBackend.flush();
			expect(errorCb).toHaveBeenCalled();
		});

		it('should removeUser() DELETE', function() {
			var mocked = {
				_id: 'as12ba',
				firstName: 'Jakub',
				lastName: 'Mach'
			};

			$httpBackend.expectDELETE(REQUEST_URL + '/users/' + mocked._id).respond(200, {});
			userService.removeUser(mocked).then(successCb, errorCb);
			$httpBackend.flush();
			expect(successCb).toHaveBeenCalled();

			$httpBackend.expectDELETE(REQUEST_URL + '/users/' + mocked._id).respond(404, {});
			userService.removeUser(mocked).then(successCb, errorCb);
			$httpBackend.flush();
			expect(errorCb).toHaveBeenCalled();
		});


		it('should getter/setter data in the model', function() {
			var someData, userModel;

			someData = [{a: 1}];
			userModel = userService.userModel.getModel();


			userService.userModel.setModel(someData);

			expect(userModel.data).toBe(someData);
		});

		it('should update object in the model', function() {
			var userModel;
			var oldData = [
				{},
				{
					_id: '1a#21',
					firstname: 'Lorean',
					dates: []
				},
				{}
			];


			var newData = {
				_id: '1a#21',
				firstname: 'Jakub',
				dates: [
					{
						type: 'BIRTHDATE',
						date: new Date(1987, 10, 11)
					}
				]
			};

			// Set old data
			userModel = userService.userModel.getModel();
			userService.userModel.setModel(oldData);

			// Update model
			userService.userModel.updateItemById(newData);

			// Expect
			expect(userModel.data[1]).toBe(newData);

		});

		it('should remove object from model', function() {
			var userModel;
			var oldData = [
				{},
				{
					_id: '1a#21',
					firstname: 'Lorean',
					dates: []
				},
				{}
			];

			var oldLenght = oldData.length;
			var removeData = {
				_id: '1a#21',
			};

			// Set old data
			userModel = userService.userModel.getModel();
			userService.userModel.setModel(oldData);

			// Update model
			userService.userModel.removeItemById(removeData);

			// Expect
			expect(userModel.data.length).toBe(oldLenght - 1);

		});

	});
});
