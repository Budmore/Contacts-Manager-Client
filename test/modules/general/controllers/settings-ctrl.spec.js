'use strict';

describe('Controller: SettingsCtrl', function () {

	// load the controller's module
	beforeEach(module('generalModule'));
	beforeEach(module('ngMaterial'));

	var scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		$controller('SettingsCtrl', {
			$scope: scope
		});
	}));

	it('should pass', function () {
		expect(scope.user).toBeDefined();
	});
});
