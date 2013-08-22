'use strict';

angular.module('angulargyanknApp', ['angularytics'])
  .config(function ($routeProvider, AngularyticsProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
	  AngularyticsProvider.setEventHandlers(['Console', 'Google']);
  }).run(function(Angularytics) {
	  Angularytics.init();
  });
