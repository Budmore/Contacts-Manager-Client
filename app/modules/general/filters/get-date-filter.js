'use strict';
// angular.module('generalModule2')
// .filter('getDate', [
// 	function() {
// 		var getDate, getFromNow;

// 		getFromNow = function(time) {
// 			var date;
// 			return date = moment(time).fromNow();
// 		};
// 		getDate = function(time, format) {
// 			var date;
// 			format = format || "DD.MM.YYYY";
// 			return date = moment(time).format(format);
// 		};


// 		*
// 		@param {number} time
// 		@param {string} type eg. "duration", "fromNow"
// 		@param {format} format eg "DD.MM.YYYY" -> "21.12.2015"
// 		@return {string} result


// 		return function(time, type, format) {
// 			var result;
// 			time = time || 0;
// 			result = '';
// 			if (typeof time === "number") {
// 				switch (type) {
// 					case "duration":
// 						result = getDuration(time);
// 						break;
// 					case "fromNow":
// 						result = getFromNow(time);
// 						break;
// 					case "date":
// 						result = getDate(time, format);
// 						break;
// 					default:
// 						result = getFromNow(time);
// 				}
// 			}
// 			return result;
// 		};
// 	}
// ]);
