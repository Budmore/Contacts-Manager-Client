'use strict';

describe('Controller: RootCtrl', function () {

  // load the controller's module
  // beforeEach(module('contactsClient'));
  beforeEach(module('generalModule'));
  // beforeEach(module('ngMaterial'));

  var RootCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    // RootCtrl = $controller('RootCtrl', {
    //   $scope: scope
    // });
  }));

  it('should pass', function () {
    expect(1).toBe(1);
  });
});
