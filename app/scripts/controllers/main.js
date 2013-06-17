'use strict';

angular.module('angulargyanknApp')
  .controller('MainCtrl', ['$scope', 'gyanken', '$timeout', function ($scope, gyanken, $timeout) {
	  // 初期化
	  $scope.myHand=null;

	  //自分の手決定時処理
	  $scope.gyanken= function() {
		  gyanken.setMyHand($scope.myHand);
		  $timeout(pon, 1500);
	  };
	  $scope.setMyHand = function(hand) {
		  $scope.myHand=hand;
		  $scope.gyanken();
	  };

	  //再戦
	  $scope.reset = function() {
		  $scope.result = null;
		  $scope.myHand = null;
		  $scope.enemyHand = null;
	  };

	  //ぽん
	  var pon=function(){
		  // コンピュータの手を決める
		  var es=['G','C','P'];
		  $scope.enemyHand=es[Math.floor(Math.random() * 3)];
		  gyanken.setEnemyHand($scope.enemyHand);

		  // 時間差で結果表示
		  $timeout(function(){
			  $scope.result=gyanken.fight();
		  },1200);
	  };
  }]);
