'use strict';

angular.module('angulargyanknApp')
  .factory('coin', function () {
    // Service logic
    // ...

	var bet = 1;

    // Public API here
	return {
		calcResult: function (result) {
						switch(result){
							case 'Win':
								myCoin += bet;
								break;
							default:
								myCoin -= bet;
								break;
						}
						return myCoin;
					},
	  getBet: function() {
		  return bet;
	  },
	  setBet: function(v) {
		  bet = v;
	  }
	};
  });
