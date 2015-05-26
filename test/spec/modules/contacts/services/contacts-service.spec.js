describe('contactsModule services:', function() {
	'use strict';
	var $httpBackend, contactsService, successCb, errorCb, GLOBAL_SETTINGS;


	beforeEach(module('contactsModule'));
	beforeEach(module('contactsClient'));

	beforeEach(inject(function($injector) {
		GLOBAL_SETTINGS = $injector.get('GLOBAL_SETTINGS');

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
			$httpBackend.expectGET(GLOBAL_SETTINGS.BASE_URL + '/contacts').respond(200, {});
			contactsService.getContacts().then(successCb, errorCb);
			$httpBackend.flush();
			expect(successCb).toHaveBeenCalled();

			$httpBackend.expectGET(GLOBAL_SETTINGS.BASE_URL + '/contacts').respond(404, {});
			contactsService.getContacts().then(successCb, errorCb);
			$httpBackend.flush();
			expect(errorCb).toHaveBeenCalled();
		});

		it('should GET contacts by id', function() {
			var mocked = {
				id: '123sad123'
			};

			$httpBackend.expectGET(GLOBAL_SETTINGS.BASE_URL + '/contacts/' + mocked.id).respond(200, {});
			contactsService.getContactById(mocked.id).then(successCb, errorCb);
			$httpBackend.flush();
			expect(successCb).toHaveBeenCalled();

			$httpBackend.expectGET(GLOBAL_SETTINGS.BASE_URL + '/contacts/' + mocked.id).respond(404, {});
			contactsService.getContactById(mocked.id).then(successCb, errorCb);
			$httpBackend.flush();
			expect(errorCb).toHaveBeenCalled();
		});

		it('should POST create contact', function() {
			var mocked = {
				firstName: 'Jakub',
				lastName: 'Mach'
			};

			$httpBackend.expectPOST(GLOBAL_SETTINGS.BASE_URL + '/contacts').respond(200, {});
			contactsService.createContact(mocked).then(successCb, errorCb);
			$httpBackend.flush();
			expect(successCb).toHaveBeenCalled();

			$httpBackend.expectPOST(GLOBAL_SETTINGS.BASE_URL + '/contacts').respond(404, {});
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

			$httpBackend.expectPUT(GLOBAL_SETTINGS.BASE_URL + '/contacts/' + mocked.id).respond(200, {});
			contactsService.updateContact(mocked).then(successCb, errorCb);
			$httpBackend.flush();
			expect(successCb).toHaveBeenCalled();

			$httpBackend.expectPUT(GLOBAL_SETTINGS.BASE_URL + '/contacts/' + mocked.id).respond(404, {});
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

			$httpBackend.expectDELETE(GLOBAL_SETTINGS.BASE_URL + '/contacts/' + mocked.id).respond(200, {});
			contactsService.removeContact(mocked).then(successCb, errorCb);
			$httpBackend.flush();
			expect(successCb).toHaveBeenCalled();

			$httpBackend.expectDELETE(GLOBAL_SETTINGS.BASE_URL + '/contacts/' + mocked.id).respond(404, {});
			contactsService.removeContact(mocked).then(successCb, errorCb);
			$httpBackend.flush();
			expect(errorCb).toHaveBeenCalled();
		});


	});
});
