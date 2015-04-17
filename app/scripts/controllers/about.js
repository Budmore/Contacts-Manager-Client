'use strict';

/**
 * @ngdoc function
 * @name contactsClient.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the contactsClient
 */
angular.module('contactsClient')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
