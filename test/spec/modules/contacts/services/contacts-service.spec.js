describe('contactsModule services:', function() {
	'use strict';
	var $httpBackend, contactsService, successCb, errorCb;

	var globalSettings = {
		baseUrl: 'http://localhost:8000'
	};


	beforeEach(module('contactsModule'));

	beforeEach(inject(function($injector) {
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
			$httpBackend.expectGET(globalSettings.baseUrl + '/contacts').respond(200, {});
			contactsService.getContacts().then(successCb, errorCb);
			$httpBackend.flush();
			expect(successCb).toHaveBeenCalled();

			$httpBackend.expectGET(globalSettings.baseUrl + '/contacts').respond(404, {});
			contactsService.getContacts().then(successCb, errorCb);
			$httpBackend.flush();
			expect(errorCb).toHaveBeenCalled();
		});

		it('should GET contacts by id', function() {
			var mocked = {
				id: '123sad123'
			};

			$httpBackend.expectGET(globalSettings.baseUrl + '/contacts/' + mocked.id).respond(200, {});
			contactsService.getContactById(mocked.id).then(successCb, errorCb);
			$httpBackend.flush();
			expect(successCb).toHaveBeenCalled();

			$httpBackend.expectGET(globalSettings.baseUrl + '/contacts/' + mocked.id).respond(404, {});
			contactsService.getContactById(mocked.id).then(successCb, errorCb);
			$httpBackend.flush();
			expect(errorCb).toHaveBeenCalled();
		});

		it('should POST create contact', function() {
			var mocked = {
				firstName: 'Jakub',
				lastName: 'Mach'
			};

			$httpBackend.expectPOST(globalSettings.baseUrl + '/contacts').respond(200, {});
			contactsService.createContact(mocked).then(successCb, errorCb);
			$httpBackend.flush();
			expect(successCb).toHaveBeenCalled();

			$httpBackend.expectPOST(globalSettings.baseUrl + '/contacts').respond(404, {});
			contactsService.createContact(mocked).then(successCb, errorCb);
			$httpBackend.flush();
			expect(errorCb).toHaveBeenCalled();
		});

		it('should PUT update contact', function() {
			var mocked = {
				id: 'as12ba',
				firstName: 'Jakub',
				lastName: 'Mach'
			};

			$httpBackend.expectPUT(globalSettings.baseUrl + '/contacts/' + mocked.id).respond(200, {});
			contactsService.updateContact(mocked).then(successCb, errorCb);
			$httpBackend.flush();
			expect(successCb).toHaveBeenCalled();

			$httpBackend.expectPUT(globalSettings.baseUrl + '/contacts/' + mocked.id).respond(404, {});
			contactsService.updateContact(mocked).then(successCb, errorCb);
			$httpBackend.flush();
			expect(errorCb).toHaveBeenCalled();
		});

		it('should DELETE remove contact', function() {
			var mocked = {
				id: 'as12ba',
				firstName: 'Jakub',
				lastName: 'Mach'
			};

			$httpBackend.expectDELETE(globalSettings.baseUrl + '/contacts/' + mocked.id).respond(200, {});
			contactsService.removeContact(mocked).then(successCb, errorCb);
			$httpBackend.flush();
			expect(successCb).toHaveBeenCalled();

			$httpBackend.expectDELETE(globalSettings.baseUrl + '/contacts/' + mocked.id).respond(404, {});
			contactsService.removeContact(mocked).then(successCb, errorCb);
			$httpBackend.flush();
			expect(errorCb).toHaveBeenCalled();
		});


	});
});
