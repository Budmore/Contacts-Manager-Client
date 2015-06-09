describe('contactsModule services:', function() {
	'use strict';
	var $httpBackend, authService, sessionService, successCb, errorCb, REQUEST_URL;

	beforeEach(module('authModule'));
	beforeEach(module('globalConfig'));

	beforeEach(inject(function($injector) {
		var GLOBAL_SETTINGS = $injector.get('GLOBAL_SETTINGS');
		REQUEST_URL = GLOBAL_SETTINGS.BASE_URL + GLOBAL_SETTINGS.API_VERSION;

		$httpBackend = $injector.get('$httpBackend');
		authService = $injector.get('authService');
		sessionService = $injector.get('sessionService');

		successCb = jasmine.createSpy();
		errorCb = jasmine.createSpy();
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});


	describe('"authService"', function() {

		it('should login() - 1', function() {
			$httpBackend.expectPOST(REQUEST_URL + '/auth/login').respond(200, {});
			authService.login().then(successCb, errorCb);
			$httpBackend.flush();
			expect(successCb).toHaveBeenCalled();

			$httpBackend.expectPOST(REQUEST_URL + '/auth/login').respond(401, {});
			authService.login().then(successCb, errorCb);
			$httpBackend.flush();
			expect(errorCb).toHaveBeenCalled();
		});


		it('should login() - 2 - with token', function() {
			var mockedRespond = {
				token: 'someToken'
			};

			spyOn(sessionService, 'setSession');

			$httpBackend.expectPOST(REQUEST_URL + '/auth/login').respond(200, mockedRespond);
			authService.login();
			$httpBackend.flush();


			expect(sessionService.setSession).toHaveBeenCalledWith(mockedRespond.token);

		});

		it('should login() - 3 - without token', function() {
			var mockedRespond = {};

			spyOn(sessionService, 'setSession');

			$httpBackend.expectPOST(REQUEST_URL + '/auth/login').respond(200, mockedRespond);
			authService.login();
			$httpBackend.flush();

			expect(sessionService.setSession).not.toHaveBeenCalled();

		});

		it('should register() - 1', function() {
			var mocked = {
				email: 'test@email.com',
				password: 'somePass'
			};

			$httpBackend.expectPOST(REQUEST_URL + '/auth/register').respond(201, {});
			authService.register(mocked).then(successCb, errorCb);
			$httpBackend.flush();
			expect(successCb).toHaveBeenCalled();

			$httpBackend.expectPOST(REQUEST_URL + '/auth/register').respond(400, {});
			authService.register(mocked).then(successCb, errorCb);
			$httpBackend.flush();
			expect(errorCb).toHaveBeenCalled();
		});

		it('should register() - 2 - with token ', function() {
			var mockedUser = {
				email: 'test@email.com',
				password: 'somePass'
			};

			var mockedRespond = {
				token: 'Alibaba'
			};

			spyOn(sessionService, 'setSession');

			$httpBackend.expectPOST(REQUEST_URL + '/auth/register').respond(201, mockedRespond);
			authService.register(mockedUser);
			$httpBackend.flush();


			expect(sessionService.setSession).toHaveBeenCalledWith(mockedRespond.token);

		});

		it('should register() - 3 - without token ', function() {
			var mockedUser = {
				email: 'test@email.com',
				password: 'somePass'
			};

			spyOn(sessionService, 'setSession');

			$httpBackend.expectPOST(REQUEST_URL + '/auth/register').respond(201, {});
			authService.register(mockedUser);
			$httpBackend.flush();


			expect(sessionService.setSession).not.toHaveBeenCalled();

		});

		it('should checkToken() - 1 ', function() {
			$httpBackend.expectGET(REQUEST_URL + '/auth/me').respond(200, {});
			authService.checkToken().then(successCb, errorCb);
			$httpBackend.flush();
			expect(successCb).toHaveBeenCalled();

			$httpBackend.expectGET(REQUEST_URL + '/auth/me').respond(400, {});
			authService.checkToken().then(successCb, errorCb);
			$httpBackend.flush();
			expect(errorCb).toHaveBeenCalled();
		});

		it('should checkToken() - 2 - with token', function() {
			var mockedRespond = {
				token: 'some$1aAsd'
			};

			spyOn(sessionService, 'setSession');

			$httpBackend.expectGET(REQUEST_URL + '/auth/me').respond(200, mockedRespond);
			authService.checkToken();
			$httpBackend.flush();
			expect(sessionService.setSession).toHaveBeenCalledWith(mockedRespond.token);
		});


		it('should checkToken() - 3 - without token', function() {
			spyOn(sessionService, 'setSession');

			$httpBackend.expectGET(REQUEST_URL + '/auth/me').respond(200, {});
			authService.checkToken();
			$httpBackend.flush();
			expect(sessionService.setSession).not.toHaveBeenCalled();
		});



	});
});
