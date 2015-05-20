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
			$httpBackend.expectGET(globalSettings.baseUrl + '/contacts').respond(200, {});
			contactsService.getContacts().then(successCb, errorCb);
			$httpBackend.flush();
			expect(successCb).toHaveBeenCalled();

			$httpBackend.expectGET(globalSettings.baseUrl + '/contacts').respond(404, {});
			contactsService.getContacts().then(successCb, errorCb);
			$httpBackend.flush();
			expect(errorCb).toHaveBeenCalled();
		});

	});
});
