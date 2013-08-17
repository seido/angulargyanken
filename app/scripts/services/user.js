'use strict';

angular.module('angulargyanknApp')
  .factory('user', function ($resource, $http) {
    // Service logic
    // ...

    // Public API here
    return {
		isLoggedIn: function () {
						return (
							document.cookie.search(/dev_appserver_login=|ACSID=/) 
							!= 
							-1);
					},
	  fetchLoginUrl: function() {
						 $http({method:'GET', url:'/user/loginurl'}).
	  success(function(data, status, headers, config) {
		  location.href=data;
	  });
					 }
    };
  });
