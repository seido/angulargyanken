'use strict';

angular.module('angulargyanknApp')
  .controller('MainCtrl', ['$scope', 'gyanken', '$timeout', 'coin', 'api', 
		  function ($scope, gyanken, $timeout, coin, api) {
	  // 初期化
	  $scope.myHand=null;

	  $scope.$watch(function(){
		  var userInfo = api.getUserInfo();
		  if(userInfo==null)
		  	return null;
		  return userInfo.coin;
	  },function(v){
		  if($scope.myCoin==null) {
			  $scope.myCoin = v;
		  }
	  });

	  var fightResult=null;

	  $scope.main={};
	  $scope.main.bet = 1;
	  //自分の手決定時処理
	  $scope.gyanken= function() {
		  fightResult = null
		  api.fight($scope.myHand, $scope.main.bet, function(resp){
			  fightResult=resp;
		  });;
		  $timeout(pon, 1500);
	  };
	  $scope.setMyHand = function(hand) {
		  $scope.myHand=hand;
		  $scope.gyanken();
	  };

	  //ぽん
	  var pon=function(){
		  if(!fightResult) {
			  $timeout(pon, 1000);
			  return;
		  }
		  // コンピュータの手を決める
		  $scope.enemyHand=fightResult.enemyHand;

		  // 時間差で結果表示
		  $timeout(function(){
			  var result=gyanken.fight();
			  $scope.result=fightResult.result;
			  $scope.myCoin=fightResult.coin;
		  },1200);
	  };

	  //再戦
	  $scope.reset = function() {
		  $scope.result = null;
		  $scope.myHand = null;
		  $scope.enemyHand = null;
	  };


	  $scope.isLoggedIn = null;
	  $scope.$watch(function(){
		  return api.isLoggedIn();
	  },function(newValue, oldValue){
		  $scope.isLoggedIn = newValue;
	  });

	  $scope.login = api.login;

  }]);
