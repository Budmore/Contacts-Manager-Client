/**
 * General module with common code.
 */

angular
	.module('calendarModule', [
		'ngResource',
		'ui.router',
		'calendarModule.directives'
	])

	.config(['$stateProvider',
	function($stateProvider) {
		'use strict';

		$stateProvider
			.state('calendar', {
				title: 'Calendar',
				url: '/calendar',
				templateUrl: 'modules/calendar/views/index.html',
				forLogged: true
			});
	}]);

