'use strict';

describe('Service: coin', function () {

  // load the service's module
  beforeEach(module('angulargyanknApp'));

  // instantiate service
  var coin;
  beforeEach(inject(function (_coin_) {
    coin = _coin_;
  }));

  it('should do something', function () {
    expect(!!coin).toBe(true);
  });

});
