describe('contactsModule services:', function() {
	'use strict';
	var $httpBackend, contactsService, successCb, errorCb, REQUEST_URL;


	beforeEach(module('contactsModule'));
	beforeEach(module('globalConfig'));

	beforeEach(inject(function($injector) {
		var GLOBAL_SETTINGS = $injector.get('GLOBAL_SETTINGS');
		REQUEST_URL = GLOBAL_SETTINGS.BASE_URL + GLOBAL_SETTINGS.API_VERSION;

		$httpBackend = $injector.get('$httpBackend');
		contactsService = $injector.get('contactsService');

		successCb = jasmine.createSpy();
		errorCb = jasmine.createSpy();
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	describe('"contactsService"', function() {


		it('should GET all contacts', function() {
			$httpBackend.expectGET(REQUEST_URL + '/contacts').respond(200, {});
			contactsService.getContacts().then(successCb, errorCb);
			$httpBackend.flush();
			expect(successCb).toHaveBeenCalled();

			$httpBackend.expectGET(REQUEST_URL + '/contacts').respond(404, {});
			contactsService.getContacts().then(successCb, errorCb);
			$httpBackend.flush();
			expect(errorCb).toHaveBeenCalled();
		});

		it('should GET contacts by id', function() {
			var mocked = {
				id: '123sad123'
			};

			$httpBackend.expectGET(REQUEST_URL + '/contacts/' + mocked.id).respond(200, {});
			contactsService.getContactById(mocked.id).then(successCb, errorCb);
			$httpBackend.flush();
			expect(successCb).toHaveBeenCalled();

			$httpBackend.expectGET(REQUEST_URL + '/contacts/' + mocked.id).respond(404, {});
			contactsService.getContactById(mocked.id).then(successCb, errorCb);
			$httpBackend.flush();
			expect(errorCb).toHaveBeenCalled();
		});

		it('should POST create contact', function() {
			var mocked = {
				firstName: 'Jakub',
				lastName: 'Mach'
			};

			$httpBackend.expectPOST(REQUEST_URL + '/contacts').respond(200, {});
			contactsService.createContact(mocked).then(successCb, errorCb);
			$httpBackend.flush();
			expect(successCb).toHaveBeenCalled();

			$httpBackend.expectPOST(REQUEST_URL + '/contacts').respond(404, {});
			contactsService.createContact(mocked).then(successCb, errorCb);
			$httpBackend.flush();
			expect(errorCb).toHaveBeenCalled();
		});

		it('should PUT update contact', function() {
			var mocked = {
				_id: 'as12ba',
				firstName: 'Jakub',
				lastName: 'Mach'
			};

			$httpBackend.expectPUT(REQUEST_URL + '/contacts/' + mocked._id).respond(200, {});
			contactsService.updateContact(mocked).then(successCb, errorCb);
			$httpBackend.flush();
			expect(successCb).toHaveBeenCalled();

			$httpBackend.expectPUT(REQUEST_URL + '/contacts/' + mocked._id).respond(404, {});
			contactsService.updateContact(mocked).then(successCb, errorCb);
			$httpBackend.flush();
			expect(errorCb).toHaveBeenCalled();
		});

		it('should DELETE remove contact', function() {
			var mocked = {
				_id: 'as12ba',
				firstName: 'Jakub',
				lastName: 'Mach'
			};

			$httpBackend.expectDELETE(REQUEST_URL + '/contacts/' + mocked._id).respond(200, {});
			contactsService.removeContact(mocked).then(successCb, errorCb);
			$httpBackend.flush();
			expect(successCb).toHaveBeenCalled();

			$httpBackend.expectDELETE(REQUEST_URL + '/contacts/' + mocked._id).respond(404, {});
			contactsService.removeContact(mocked).then(successCb, errorCb);
			$httpBackend.flush();
			expect(errorCb).toHaveBeenCalled();
		});


	});
});
