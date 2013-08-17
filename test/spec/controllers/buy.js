'use strict';

describe('Controller: BuyCtrl', function () {

  // load the controller's module
  beforeEach(module('angulargyanknApp'));

  var BuyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BuyCtrl = $controller('BuyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
