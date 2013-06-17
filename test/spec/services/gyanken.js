'use strict';

describe('Service: gyanken', function () {

  // load the service's module
  beforeEach(module('angulargyanknApp'));

  // instantiate service
  var gyanken;
  beforeEach(inject(function (_gyanken_) {
    gyanken = _gyanken_;
  }));

  it('should do something', function () {
    expect(!!gyanken).toBe(true);
  });

});
