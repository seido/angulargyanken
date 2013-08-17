'use strict';

angular.module('angulargyanknApp')
.factory('api', function ($rootScope) {
	//var ROOT = 'http://localhost:8080/_ah/api';
	var ROOT = 'https://billingtest-obieseido.appspot.com/_ah/api';
	gapi.client.load('billingtest', 'v1', function() {
	}, ROOT);

	var userInfo = null;
	var loginSuccess = function(resp) {
		userInfo = resp;
		_isLoggedIn = true;
		$rootScope.$digest();
	};
	var loginFailed = function() {
		_isLoggedIn = false;
		$rootScope.$digest();
	};

	var _logout = function() {
		gapi.auth.setToken(null);
	}

	var authInternal = function(immediate, success, failed) {
		var authedCallback = function() {
			gapi.client.oauth2.userinfo.get().execute(function(resp) {
				if (!resp.code) {
					var token = gapi.auth.getToken();
					token.access_token = token.id_token;
					gapi.auth.setToken(token);
					// User is signed in, call my Endpoint
					gapi.client.billingtest.user.fetch().execute(function(resp){
						if(!resp.code) {
							loginSuccess(resp);
							if(success) {
								$rootScope.$apply(function(){
									success(resp);
								});
							}
						} else {
							if(resp.code==401) {
								_logout();
							}
							loginFailed();
							$rootScope.$apply(failed);
						}
					});
				} else {
					loginFailed();
					if(failed) {
						$rootScope.$apply(failed);
					}
				}
			});
		};
		gapi.auth.authorize({
			client_id: "528512890343.apps.googleusercontent.com", 
			scope: [
			"https://www.googleapis.com/auth/userinfo.email"
			,"https://www.googleapis.com/auth/userinfo.profile"
			],
			immediate: immediate, response_type: 'token id_token'
		}, authedCallback);
	};

	var _isLoggedIn = null;
	gapi.client.load('oauth2', 'v2', function() {
		authInternal(true);
	});

	// Public API here
	return {
		getUserInfo: function (callback) {
			return userInfo;
		},
		isLoggedIn: function () {
			return _isLoggedIn;
		},
		login: function(success, failed) {
			authInternal(false, success, failed);
		},
		logout : function() {
			_logout();
		},
		fight : function(myHand, bet, callback) {
			gapi.client.billingtest.game.fight({
				myHand:myHand, bet:bet
			}).execute(function(resp){
				userInfo.coin = resp.coin;
				if(callback){
					$rootScope.$apply(function(){
						callback(resp);
					});
				}
			});
		}
	};
});
