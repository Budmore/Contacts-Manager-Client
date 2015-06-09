describe('contactsModule services:', function() {
	'use strict';
	var $http, $httpBackend, authService, sessionService, successCb, errorCb, REQUEST_URL;

	beforeEach(module('authModule'));
	beforeEach(module('globalConfig'));

	beforeEach(inject(function($injector) {
		var GLOBAL_SETTINGS = $injector.get('GLOBAL_SETTINGS');
		REQUEST_URL = GLOBAL_SETTINGS.BASE_URL + GLOBAL_SETTINGS.API_VERSION;

		$http          = $injector.get('$http');
		$httpBackend   = $injector.get('$httpBackend');
		sessionService = $injector.get('sessionService');
		authService    = $injector.get('authService');

		successCb = jasmine.createSpy();
		errorCb   = jasmine.createSpy();
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});


	describe('"sessionService"', function() {

		it('should getSession() - 1', function() {
			var session = sessionService.getSession();
			expect(session.isLogged).toBe(false);
		});


		it('should getSession() - 2 - with setSession()', function() {
			var  _token = 'asW32';
			var session = sessionService.getSession();
			expect(session.isLogged).toBeFalsy();

			sessionService.setSession(_token);

			expect(session.isLogged).toBe(true);
		});

		it('should setSession()', function() {
			var _token = 'asW32#as3';
			spyOn(localStorage, 'setItem');
			spyOn(sessionService, 'setHeaders');

			sessionService.setSession(_token);
			expect(localStorage.setItem).toHaveBeenCalledWith('token', _token);
			expect(sessionService.setHeaders).toHaveBeenCalledWith(_token);

		});

		it('should clearSession()', function() {
			spyOn(localStorage, 'removeItem');
			spyOn(sessionService, 'clearHeaders');

			sessionService.clearSession();
			expect(localStorage.removeItem).toHaveBeenCalledWith('token');
			expect(sessionService.clearHeaders).toHaveBeenCalled();
		});

		it('should setHeaders()', function() {
			var _token = '123@!as3';
			sessionService.setHeaders(_token);

			expect($http.defaults.headers.common['x-access-token']).toBe(_token);
		});

		it('should clearHeaders()', function() {
			sessionService.clearHeaders();
			expect($http.defaults.headers.common['x-access-token']).toBeUndefined();
		});


	});
});
