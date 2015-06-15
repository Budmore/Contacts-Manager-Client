describe('authModule.controllers: "AuthCtrl"', function() {
	'use strict';

	var $q, rootScope, scope, location, authService, sessionService;

	beforeEach(function() {
		module('globalConfig');
		module('authModule.controllers');
		module('authModule.services');
	});

	var stateMock = {
		go: jasmine.createSpy()
	};

	beforeEach(inject(function($rootScope, $controller, $location, _$q_, _authService_, _sessionService_) {
		rootScope = $rootScope;
		scope = $rootScope.$new();
		authService = _authService_;
		sessionService = _sessionService_;
		location = $location;
		$q = _$q_;

		$controller('AuthCtrl', {
			$rootScope: rootScope,
			$scope: scope,
			$state: stateMock,
			$location: location,
			authService: authService
		});

	}));



	var mockedUser = {
		email: 'em@as.pl',
		password: 'secretPassword'
	};

	var mockedResponse = {
		token: 'raNDomToKEn'
	};



	it('should login() - 1', function() {
		var dfd = $q.defer();
		spyOn(authService, 'login').and.returnValue(dfd.promise);

		scope.login(mockedUser);
		expect(scope.isPending).toEqual(true);
		dfd.resolve(mockedResponse);
		scope.$digest();

		expect(scope.isPending).toEqual(false);
		expect(authService.login).toHaveBeenCalledWith(mockedUser);
	});


	it('should login() - 2 - no user', function() {
		spyOn(authService, 'login');

		scope.login();

		expect(authService.login).not.toHaveBeenCalled();
	});

	it('should login() - 3 - resposne with token', function() {
		var dfd = $q.defer();
		spyOn(authService, 'login').and.returnValue(dfd.promise);
		spyOn(sessionService, 'setSession');

		scope.login(mockedUser);
		dfd.resolve(mockedResponse);
		scope.$digest();

		expect(sessionService.setSession).toHaveBeenCalledWith(mockedResponse.token);
	});

	it('should login() - 4 - resposne without token', function() {
		var dfd = $q.defer();
		spyOn(authService, 'login').and.returnValue(dfd.promise);
		spyOn(sessionService, 'setSession');

		scope.login(mockedUser);
		expect(scope.isError).toEqual(false);

		dfd.resolve();
		scope.$digest();

		expect(sessionService.setSession).not.toHaveBeenCalled();
		expect(scope.isError).toEqual(true);
	});

	it('should login() - 5 - reject', function() {
		var dfd = $q.defer();
		spyOn(authService, 'login').and.returnValue(dfd.promise);

		scope.login(mockedUser);
		expect(scope.isError).toEqual(false);

		dfd.reject();
		scope.$digest();

		expect(scope.isError).toEqual(true);
	});





	it('should register() - 1', function() {
		var dfd = $q.defer();
		spyOn(authService, 'register').and.returnValue(dfd.promise);

		scope.register(mockedUser);
		expect(scope.isPending).toEqual(true);
		dfd.resolve(mockedResponse);
		scope.$digest();

		expect(scope.isPending).toEqual(false);
		expect(authService.register).toHaveBeenCalledWith(mockedUser);
	});

	it('should register() - 2 - no user', function() {
		spyOn(authService, 'register');

		scope.register();

		expect(authService.register).not.toHaveBeenCalled();
	});

	it('should register() - 3 - resposne with token', function() {
		var dfd = $q.defer();
		spyOn(authService, 'register').and.returnValue(dfd.promise);
		spyOn(sessionService, 'setSession');

		scope.register(mockedUser);
		dfd.resolve(mockedResponse);
		scope.$digest();

		expect(sessionService.setSession).toHaveBeenCalledWith(mockedResponse.token);
	});

	it('should register() - 4 - resposne without token', function() {
		var dfd = $q.defer();
		spyOn(authService, 'register').and.returnValue(dfd.promise);
		spyOn(sessionService, 'setSession');

		scope.register(mockedUser);
		expect(scope.isError).toEqual(false);

		dfd.resolve();
		scope.$digest();

		expect(sessionService.setSession).not.toHaveBeenCalled();
		expect(scope.isError).toEqual(true);
	});

	it('should register() - 5 - reject', function() {
		var dfd = $q.defer();
		spyOn(authService, 'register').and.returnValue(dfd.promise);

		scope.register(mockedUser);
		expect(scope.isError).toEqual(false);

		dfd.reject();
		scope.$digest();

		expect(scope.isError).toEqual(true);
	});



	it('should logout()', function() {
		spyOn(sessionService, 'clearSession');
		spyOn(rootScope, '$broadcast');

		scope.logout();

		expect(sessionService.clearSession).toHaveBeenCalled();
		expect(rootScope.$broadcast).toHaveBeenCalledWith('AUTH::LOGOUT');
		expect(stateMock.go).toHaveBeenCalledWith('login');
	});




	it('should loginAsGuest()', function() {
		spyOn(sessionService, 'setSession');

		scope.loginAsGuest();

		expect(sessionService.setSession).toHaveBeenCalled();
		expect(location.path()).toBe('/');
	});



	it('should clearError()', function() {
		scope.isError = true;

		scope.clearError();

		expect(scope.isError).toBe(false);
	});
});
