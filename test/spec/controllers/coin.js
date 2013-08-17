'use strict';

describe('Controller: CoinCtrl', function () {

  // load the controller's module
  beforeEach(module('angulargyanknApp'));

  var CoinCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CoinCtrl = $controller('CoinCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
