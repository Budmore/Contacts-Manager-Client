'use strict';

/**
 * @ngdoc overview
 * @name contactsClient
 * @description
 * # contactsClient
 *
 * Main module of the application.
 */
angular
  .module('contactsClient', [
    'ngAnimate',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'ui.router',
  ])
  .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('mainpage', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('/about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      });

  }]);
