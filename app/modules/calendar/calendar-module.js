/**
 * General module with common code.
 */

 console.log('this calendarModule - pre');
angular
	.module('calendarModule', [
		'ngResource',
		'ui.router',
		'calendarModule.directives'
	])

	.config(['$stateProvider',
	function($stateProvider) {
		'use strict';
		console.log('this calendarModule');
		$stateProvider
			.state('calendar', {
				title: 'Calendar',
				url: '/calendar',
				templateUrl: 'modules/calendar/views/index.html',
				forLogged: true
			});
	}]);

