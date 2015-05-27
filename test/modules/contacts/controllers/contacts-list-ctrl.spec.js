describe('contactsModule controller: "ContactsListCtrl"', function() {
	'use strict';

	var $q,
		scope,
		contactsService;


	// load the controller's module
	beforeEach(module('contactsModule'));
	beforeEach(module('globalConfig'));

	beforeEach(inject(function($rootScope, $controller, _$q_, _contactsService_) {
		$q = _$q_;
		scope = $rootScope.$new();
		contactsService = _contactsService_;

		$controller('ContactsListCtrl', {
			$scope: scope,
			contactsService: contactsService
		});

	}));


	it('should get contacts list', function() {
		var dfd = $q.defer();
		spyOn(contactsService, 'getContacts').and.returnValue(dfd.promise);

		var _responseMock = {
			count: 0,
			data: []
		};

		scope.getContacts();

		dfd.resolve(_responseMock);
		scope.$digest();

		expect(contactsService.getContacts).toHaveBeenCalled();
		expect(scope.showSpinner).toBe(false);

	});

	it('should update contact - success', function() {

		var dfd = $q.defer();
		spyOn(contactsService, 'updateContact').and.returnValue(dfd.promise);

		var _contact = {};
		scope.updateContact(_contact);

		// Promise resolve - success
		dfd.resolve();
		scope.$digest();

		expect(contactsService.updateContact).toHaveBeenCalledWith(_contact);
		expect(scope.isError).toBe(false);
	});

	it('should update contact - error', function() {

		var dfd = $q.defer();
		spyOn(contactsService, 'updateContact').and.returnValue(dfd.promise);

		var _contact = {};
		scope.updateContact(_contact);

		// Promise resolve - success
		dfd.reject();
		scope.$digest();

		expect(contactsService.updateContact).toHaveBeenCalledWith(_contact);
		expect(scope.isError).toBe(true);
	});



	it('should remove contact - success', function() {

		var dfd = $q.defer();
		spyOn(contactsService, 'removeContact').and.returnValue(dfd.promise);

		var _contact = {};
		scope.removeContact(_contact);

		// Promise resolve - success
		dfd.resolve();
		scope.$digest();

		expect(contactsService.removeContact).toHaveBeenCalledWith(_contact);
		expect(scope.isError).toBe(false);
	});

	it('should remove contact - error', function() {

		var dfd = $q.defer();
		spyOn(contactsService, 'removeContact').and.returnValue(dfd.promise);

		var _contact = {};
		scope.removeContact(_contact);

		// Promise reject - error
		dfd.reject();
		scope.$digest();

		expect(contactsService.removeContact).toHaveBeenCalledWith(_contact);
		expect(scope.isError).toBe(true);
	});

});
