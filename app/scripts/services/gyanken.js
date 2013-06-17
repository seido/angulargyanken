'use strict';

angular.module('angulargyanknApp')
.factory('gyanken', function () {
	// Service logic
	// ...

	var myHand = null;
	var enemyHand = null;

	// Public API here
	return {
		setMyHand: function (type) {
			myHand=type;
		},
		getMyHand: function () {
			return myHand;
		},
		getEnemyHand: function () {
			return enemyHand;
		},
		setEnemyHand: function(type) {
			enemyHand=type;
		},
		fight: function () {
			if(myHand===null || myHand==='') {
				return 'Err no myHand';
			}
			if(enemyHand===null || enemyHand==='') {
				return 'Wait';
			}
			if(myHand===enemyHand) {
				return 'Even';
			}
			switch(myHand) {
			case 'G':
				if(enemyHand==='C') {
					return 'Win';
				}
				break;
			case 'C':
				if(enemyHand==='P') {
					return 'Win';
				}
				break;
			case 'P':
				if(enemyHand==='G') {
					return 'Win';
				}
				break;
			}
			return 'Lose';
		}
	};
});
