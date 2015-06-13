describe('demoModule controller: "DemoContactsListCtrl"', function() {
	'use strict';

	var $httpBackend,
		contactsService,
		scope;


	// load the controller's module
	beforeEach(function() {
		module('demoModule');
		module('contactsModule');
		module('globalConfig');
		module('ngMaterial');
	});

	contactsService = {
		parseAllDates: jasmine.createSpy(),
		contactsModel: {
			getModel: jasmine.createSpy(),
			setModel: jasmine.createSpy(),
			removeItemById: jasmine.createSpy()
		}
	};

	beforeEach(inject(function($rootScope, $controller, _$httpBackend_) {
		scope = $rootScope.$new();
		$httpBackend = _$httpBackend_;
		$controller('DemoContactsListCtrl', {
			$scope: scope,
			contactsService: contactsService
		});

	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should init()', function() {
		spyOn(scope, 'getContacts');

		scope.contactsList = {
			data: []
		};

		scope.init();

		expect(scope.getContacts).toHaveBeenCalled();
	});

	it('should getContacts() ', function() {
		spyOn(scope, 'sortByType');
		var REQUEST_URL = '/images/demo/scientists-list.json';
		var mockedData = {
			data: [{}]
		};
		$httpBackend.expectGET(REQUEST_URL).respond(200, mockedData);
		scope.getContacts();
		$httpBackend.flush();

		expect(scope.sortByType).toHaveBeenCalled();
		expect(contactsService.parseAllDates).toHaveBeenCalled();
		expect(contactsService.contactsModel.setModel).toHaveBeenCalled();


	});

	it('should removeContact()', function() {
		var mockedData = {some:''};
		scope.removeContact(mockedData);
		expect(contactsService.contactsModel.removeItemById).toHaveBeenCalledWith(mockedData);
	});


});
