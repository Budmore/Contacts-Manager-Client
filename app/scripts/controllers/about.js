'use strict';

/**
 * @ngdoc function
 * @name contactsClientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the contactsClientApp
 */
angular.module('contactsClientApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
