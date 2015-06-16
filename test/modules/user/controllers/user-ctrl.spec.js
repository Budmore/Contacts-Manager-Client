describe('userModule.controller: "UserCtrl"', function() {
	'use strict';

	var $q,
		$mdToast,
		rootScope,
		scope,
		userService;


	beforeEach(function() {
		module('userModule.controllers');
		module('userModule.services');
		module('ngMaterial');
		module('globalConfig');
	});


	beforeEach(inject(function($rootScope, $controller, _$q_, _$mdToast_ ,_userService_) {
		$q = _$q_;
		rootScope = $rootScope;
		scope = $rootScope.$new();
		userService = _userService_;
		$mdToast = _$mdToast_;

		$controller('UserCtrl', {
			$scope: scope,
			userService: userService
		});

	}));

	var mockedUser = {
		_id: 'ad#42sdf',
		email: 'some@email.com'
	};

	var mockedResponse = {
		firstname: 'Jakub',
		lastname: 'Mach'
	};





	it('should getUser() - 1 success', function() {
		var dfd = $q.defer();
		spyOn(userService, 'getUser').and.returnValue(dfd.promise);
		spyOn(userService.userModel, 'setModel');

		scope.getUser();
		dfd.resolve(mockedResponse);
		scope.$digest();

		expect(userService.getUser).toHaveBeenCalled();
		expect(userService.userModel.setModel).toHaveBeenCalledWith(mockedResponse);

	});

	it('should getUser() - 2 error', function() {
		var dfd = $q.defer();
		spyOn(userService, 'getUser').and.returnValue(dfd.promise);

		scope.getUser();
		expect(scope.isError).toBe(false);
		expect(scope.isPending).toBe(true);
		dfd.reject();
		scope.$digest();

		expect(scope.isError).toBe(true);
		expect(scope.isPending).toBe(false);
		expect(userService.getUser).toHaveBeenCalledWith();

	});





	it('should updateUser() - 1 - no user || no user._id', function() {
		spyOn(userService, 'updateUser');

		scope.updateUser(null);
		scope.updateUser({firstname: 'Lolek'});

		expect(userService.updateUser).not.toHaveBeenCalled();
	});

	it('should updateUser() - 2 success', function() {
		var dfd = $q.defer();
		spyOn(userService, 'updateUser').and.returnValue(dfd.promise);
		spyOn(userService.userModel, 'setModel');
		spyOn($mdToast, 'show');

		scope.updateUser(mockedUser);
		dfd.resolve(mockedResponse);
		scope.$digest();

		expect(userService.updateUser).toHaveBeenCalledWith(mockedUser);
		expect($mdToast.show).toHaveBeenCalled();
		expect(userService.userModel.setModel).toHaveBeenCalledWith(mockedResponse);

	});

	it('should updateUser() - 3 error', function() {
		var dfd = $q.defer();
		spyOn($mdToast, 'show');
		spyOn(userService, 'updateUser').and.returnValue(dfd.promise);
		scope.updateUser(mockedUser);
		expect(scope.isError).toBe(false);
		expect(scope.isPending).toBe(true);
		dfd.reject();
		scope.$digest();

		expect(scope.isError).toBe(true);
		expect(scope.isPending).toBe(false);
		expect($mdToast.show).toHaveBeenCalled();
		expect(userService.updateUser).toHaveBeenCalledWith(mockedUser);

	});





	it('should removeUser() - 1 - no user || no user.password', function() {
		spyOn(userService, 'removeUser');

		scope.removeUser();
		expect(userService.removeUser).not.toHaveBeenCalled();

		var user1 = {
			_id: '1123123',
			password: null
		};

		scope.removeUser(user1);
		expect(userService.removeUser).not.toHaveBeenCalled();

		var user2 = {
			_id: null,
			password: 'secret'
		};

		scope.removeUser(user2);
		expect(userService.removeUser).not.toHaveBeenCalled();
	});


	it('should removeUser() - 2 success', function() {
		var dfd = $q.defer();
		spyOn(userService, 'removeUser').and.returnValue(dfd.promise);

		var _user = {
			_id: 'a123#21',
			password: 'secret'
		};

		scope.removeUser(_user);
		dfd.resolve(mockedResponse);
		scope.$digest();

		expect(userService.removeUser).toHaveBeenCalledWith(_user);
	});

	it('should removeUser() - 3 success', function() {
		var dfd = $q.defer();
		spyOn(userService, 'removeUser').and.returnValue(dfd.promise);
		spyOn(rootScope, '$broadcast');
		spyOn($mdToast, 'show');


		var _user = {
			_id: 'a123#21',
			password: 'secret'
		};

		scope.removeUser(_user);
		dfd.resolve(mockedResponse);
		scope.$digest();


		expect(rootScope.$broadcast).toHaveBeenCalledWith('AUTH::LOGOUT');
		expect($mdToast.show).toHaveBeenCalled();
	});

	it('should removeUser() - 4 error', function() {
		var dfd = $q.defer();
		spyOn(userService, 'removeUser').and.returnValue(dfd.promise);
		spyOn($mdToast, 'show');

		var _user = {
			_id: 'a123#21',
			password: 'secret'
		};

		scope.removeUser(_user);
		expect(scope.isError).toBe(false);
		expect(scope.isPending).toBe(true);

		dfd.reject(mockedResponse);
		scope.$digest();


		expect(scope.isError).toBe(true);
		expect(scope.isPending).toBe(false);
		expect($mdToast.show).toHaveBeenCalled();
	});



	it('should init() - 1 isDemoMode', function() {
		spyOn(scope, 'getUser');
		rootScope.isDemoMode = true;

		scope.init();

		expect(scope.user).toEqual(jasmine.any(Object));
		expect(scope.getUser).not.toHaveBeenCalled();

	});

	it('should init() - 2', function() {
		spyOn(scope, 'getUser');
		spyOn(userService.userModel, 'getModel').and.callFake(function() {
			return;
		});

		scope.init();

		expect(userService.userModel.getModel).toHaveBeenCalled();
		expect(scope.getUser).toHaveBeenCalled();

	});

});
