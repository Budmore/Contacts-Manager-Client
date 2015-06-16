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





	it('should getUserById() - 1 no userId', function() {
		spyOn(userService, 'getUserById');
		scope.getUserById(null);

		expect(userService.getUserById).not.toHaveBeenCalled();
	});


	it('should getUserById() - 2 success', function() {
		var dfd = $q.defer();
		spyOn(userService, 'getUserById').and.returnValue(dfd.promise);
		spyOn(userService.userModel, 'setModel');

		scope.getUserById(mockedUser._id);
		dfd.resolve(mockedResponse);
		scope.$digest();

		expect(userService.getUserById).toHaveBeenCalledWith({_id: mockedUser._id});
		expect(userService.userModel.setModel).toHaveBeenCalledWith(mockedResponse);

	});

	it('should getUserById() - 3 error', function() {
		var dfd = $q.defer();
		spyOn(userService, 'getUserById').and.returnValue(dfd.promise);

		scope.getUserById(mockedUser._id);
		expect(scope.isError).toBe(false);
		expect(scope.isPending).toBe(true);
		dfd.reject();
		scope.$digest();

		expect(scope.isError).toBe(true);
		expect(scope.isPending).toBe(false);
		expect(userService.getUserById).toHaveBeenCalledWith({_id: mockedUser._id});

	});





	it('should updateUser() - 1 no userId', function() {
		spyOn(userService, 'updateUser');

		scope.updateUser(null);

		expect(userService.updateUser).not.toHaveBeenCalled();
	});

	it('should updateUser() - 2 success', function() {
		var dfd = $q.defer();
		spyOn(userService, 'updateUser').and.returnValue(dfd.promise);
		spyOn(userService.userModel, 'setModel');
		spyOn($mdToast, 'show');

		scope.updateUser(mockedUser._id);
		dfd.resolve(mockedResponse);
		scope.$digest();

		expect(userService.updateUser).toHaveBeenCalledWith({_id: mockedUser._id});
		expect($mdToast.show).toHaveBeenCalled();
		expect(userService.userModel.setModel).toHaveBeenCalledWith(mockedResponse);

	});

	it('should updateUser() - 3 error', function() {
		var dfd = $q.defer();
		spyOn($mdToast, 'show');
		spyOn(userService, 'updateUser').and.returnValue(dfd.promise);
		scope.updateUser(mockedUser._id);
		expect(scope.isError).toBe(false);
		expect(scope.isPending).toBe(true);
		dfd.reject();
		scope.$digest();

		expect(scope.isError).toBe(true);
		expect(scope.isPending).toBe(false);
		expect($mdToast.show).toHaveBeenCalled();
		expect(userService.updateUser).toHaveBeenCalledWith({_id: mockedUser._id});

	});





	it('should removeUser() - 1 no userId/password', function() {
		spyOn(userService, 'removeUser');

		scope.removeUser();
		expect(userService.removeUser).not.toHaveBeenCalled();

		scope.removeUser('someID');
		expect(userService.removeUser).not.toHaveBeenCalled();

		scope.removeUser(null, 'somePassword');
		expect(userService.removeUser).not.toHaveBeenCalled();
	});


	it('should removeUser() - 2 success', function() {
		var dfd = $q.defer();
		spyOn(userService, 'removeUser').and.returnValue(dfd.promise);

		var _user = {
			_id: 'a123#21',
			password: 'secret'
		};

		scope.removeUser(_user._id, _user.password);
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

		scope.removeUser(_user._id, _user.password);
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

		scope.removeUser(_user._id, _user.password);
		expect(scope.isError).toBe(false);
		expect(scope.isPending).toBe(true);

		dfd.reject(mockedResponse);
		scope.$digest();


		expect(scope.isError).toBe(true);
		expect(scope.isPending).toBe(false);
		expect($mdToast.show).toHaveBeenCalled();
	});





});
