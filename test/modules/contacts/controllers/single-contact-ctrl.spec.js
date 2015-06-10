'use strict';

describe('contactsModule services: "SingleContactCtrl"', function () {

	// load the controller's module
	beforeEach(module('contactsModule'));
	beforeEach(module('globalConfig'));
	beforeEach(module('ngMaterial'));

	var $q,
		$mdToast,
		scope,
		contactsService,
		createParentController;


	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope, _$q_, _contactsService_, _$mdToast_) {
		$q = _$q_;
		contactsService = _contactsService_;
		$mdToast = _$mdToast_;

		scope = $rootScope.$new();

		$controller('SingleContactCtrl', {
			$scope: scope,
			$rootScope: scope,
			contactsService: contactsService
		});

		createParentController = function() {
			return 	$controller('ContactsListCtrl', {
				$scope: scope,
				// contactsService: contactsService
			});
		};

	}));



	it('should create new contact - success', function () {
		var dfd = $q.defer();

		var contactMocked = {};
		var respondMocked = {};

		spyOn(scope, 'closePanel').and.callThrough();
		spyOn(contactsService, 'createContact').and.returnValue(dfd.promise);
		spyOn(contactsService.contactsModel, 'addToModel').and.callFake(function() {
			return true;
		});
		scope.createContact(contactMocked);

		expect(scope.showSpinner).toBe(true);
		expect(scope.isError).toBe(false);

		// Promise - resolve (success scenario)
		dfd.resolve(respondMocked);
		scope.$digest();

		expect(contactsService.createContact).toHaveBeenCalledWith(contactMocked);
		expect(contactsService.contactsModel.addToModel).toHaveBeenCalledWith(respondMocked);
		expect(scope.closePanel).toHaveBeenCalled();
		expect(scope.showSpinner).toBe(false);
	});

	it('should create new contact - error', function () {
		var dfd = $q.defer();

		var contactMocked = {};


		spyOn(contactsService, 'createContact').and.returnValue(dfd.promise);
		scope.createContact(contactMocked);

		expect(scope.showSpinner).toBe(true);
		expect(scope.isError).toBe(false);

		// Promise - reject (error scenario)
		dfd.reject();
		scope.$digest();

		expect(contactsService.createContact).toHaveBeenCalledWith(contactMocked);
		expect(scope.isError).toBe(true);
		expect(scope.showSpinner).toBe(false);
	});

	it('should update contact - success', function() {

		var dfd = $q.defer();
		spyOn(contactsService, 'updateContact').and.returnValue(dfd.promise);
		spyOn(contactsService.contactsModel, 'updateItemById').and.callFake(function() {
			return true;
		});

		var _contact = {};
		var respondMocked = {};
		scope.updateContact(_contact);

		// Promise resolve - success
		dfd.resolve(respondMocked);
		scope.$digest();

		expect(contactsService.updateContact).toHaveBeenCalledWith(_contact);
		expect(contactsService.contactsModel.updateItemById).toHaveBeenCalledWith(respondMocked);
		expect(scope.isError).toBe(false);
	});

	it('should update contact - error', function() {

		var dfd = $q.defer();
		spyOn(contactsService, 'updateContact').and.returnValue(dfd.promise);
		var _contact = {
			firstname: 'Whoopi'
		};
		scope.updateContact(_contact);

		// Promise reject - error
		dfd.reject();
		scope.$digest();

		expect(contactsService.updateContact).toHaveBeenCalledWith(_contact);
		expect(scope.isError).toBe(true);
	});



	it('should remove item from array', function() {
		var _array = ['1', 3, 'aa'];
		var arrayLengthBefore = _array.length;

		scope.removeItemFromArray('aa', _array);

		expect(_array.length).toBe(arrayLengthBefore - 1);
	});

	it('should add specific date type to the model', function() {
		var _model = {
			dates: []
		};
		var someType = 'BIRTHDATE';
		var arrayLengthBefore = _model.dates.length;

		scope.addDate(someType, _model);

		expect(_model.dates.length).toBe(arrayLengthBefore + 1);
		expect(_model.dates[0].type).toBe(someType);
	});

	it('should aksBeforeRemove() - without $mdToast service', function() {
		var _contact = {
			firstname: 'Arni'
		};

		spyOn(scope, 'closePanel').and.callThrough();
		spyOn(contactsService.contactsModel, 'removeItemById').and.callFake(function() {
			return true;
		});

		scope.askBeforeRemove(_contact);

		expect(scope.closePanel).toHaveBeenCalled();
		expect(contactsService.contactsModel.removeItemById).toHaveBeenCalledWith(_contact);
	});

	it('should aksBeforeRemove() - with $mdToast restoreContact()', function() {
		var _contact = {
			firstname: 'Arni'
		};
		var dfd = $q.defer();
		spyOn($mdToast, 'show').and.returnValue(dfd.promise);
		spyOn(contactsService.contactsModel, 'addToModel').and.callFake(function() {
			return true;
		});

		scope.askBeforeRemove(_contact);
		dfd.resolve();
		scope.$digest();

		expect($mdToast.show).toHaveBeenCalled();
		expect(contactsService.contactsModel.addToModel).toHaveBeenCalledWith(_contact);

	});

	it('should aksBeforeRemove() - with $mdToast removeContact()', function() {
		createParentController();
		var _contact = {
			firstname: 'Arni'
		};
		var dfd = $q.defer();
		spyOn($mdToast, 'show').and.returnValue(dfd.promise);
		spyOn(scope, 'removeContact').and.callFake(function() {
			return true;
		});

		scope.askBeforeRemove(_contact);
		dfd.reject();
		scope.$digest();


		expect($mdToast.show).toHaveBeenCalled();
		expect(scope.removeContact).toHaveBeenCalledWith(_contact);
	});
});
