'use strict';

describe('Controller: UpdateCtrl', function () {

  // load the controller's module
  beforeEach(module('artworksApp'));

  var UpdateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UpdateCtrl = $controller('UpdateCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
