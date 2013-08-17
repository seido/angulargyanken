'use strict';
/*global gapi:false */

angular.module('angulargyanknApp')
.factory('api', function ($rootScope) {

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
		_isLoggedIn = false;
	};

	var authInternal = function(immediate, success, failed) {
		var authedCallback = function() {
			console.log('oauth get user');
			gapi.client.oauth2.userinfo.get().execute(function(resp) {
				if (!resp.code) {
					console.log('oauth get user response OK');
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
							if(resp.code===401) {
								_logout();
								$rootScope.$digest();
							}
							loginFailed();
							$rootScope.$apply(failed);
						}
					});
				} else {
					console.log('oauth get user response NG');
					loginFailed();
					if(failed) {
						$rootScope.$apply(failed);
					}
				}
			});
		};
		console.log('authorize');
		gapi.auth.authorize({
			client_id: '528512890343.apps.googleusercontent.com',
			scope: [
			'https://www.googleapis.com/auth/userinfo.email',
			'https://www.googleapis.com/auth/userinfo.profile'
			],
			immediate: immediate, response_type: 'token id_token'
		}, authedCallback);
	};

	var _isLoggedIn = null;
	//var ROOT = 'http://localhost:8080/_ah/api';
	var ROOT = 'https://billingtest-obieseido.appspot.com/_ah/api';
	gapi.client.load('billingtest', 'v1', function() {
		console.log('load oauth gapi');
		gapi.client.load('oauth2', 'v2', function() {
			console.log('loaded oauth gapi');
			authInternal(true);
		});
	}, ROOT);

	// Public API here
	return {
		getUserInfo: function () {
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
			window.location.href='https://accounts.google.com/logout';
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
