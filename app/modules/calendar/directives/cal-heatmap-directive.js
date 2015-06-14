/* global CalHeatMap */
'use strict';
angular.module('calendarModule.directives', [])

	.directive('calHeatmap', function () {


		function generateTimestamp() {
			var timestamp;

			var date = new Date();
			var year = date.getFullYear();

			var randomMonth = Math.floor(Math.random() * (12));
			var randomDay = Math.floor(Math.random() * (28)); // max 28 - fast fix

			var randomDate = new Date(year, randomMonth, randomDay);

			timestamp = randomDate.getTime() / 1000;

			return timestamp;
		}


		function generateData(counter) {
			var result = {};

			for (var i = 0; i<counter; i++) {
				var randomBirthdates = Math.floor(Math.random() * (5));
				result[generateTimestamp()] = randomBirthdates;
			}

			return result;

		}


		function link(scope, element) {
			var cal = new CalHeatMap();

			var config = scope.config || {};
			var today = new Date();
			var thisYear = new Date(today.getFullYear(), 0);

			var mockedTimestamps = generateData(55);

			var defaults = {
				itemSelector: '#cal-heatmap',
				domain: 'month',
				subDomain: 'day',
				// subDomainTextFormat: '%d',
				subDomainTextFormat: '',
				data: mockedTimestamps,
				// afterLoadData: mockedTimestamps,
				start: thisYear,
				// cellSize: 10,
				// cellPadding: 3,
				range: 12,
				domainGutter: 10,
				tooltip: true,
				legend: [0, 2, 4, 6],
				itemName: 'item',
				onClick: function(date) {
					var _date = moment(date).format('DD MMMM YYYY');
					scope.selected = _date;
					scope.$apply();
				}
			};

			angular.extend(defaults, config);
			cal.init(defaults);


		}

		return {
			template: '<div id="cal-heatmap"></div>',
			restrict: 'A',
			link: link,
			scope: {
				config: '=',
				selected: '='
			}
		};
	});
