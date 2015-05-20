'use strict';

/**
 * @ngdoc function
 * @name contactsModule.controller:ContactsListCtrl
 * @description
 * # ContactsListCtrl
 * Controller of the contactsModule
 */
angular.module('contactsModule')
	.controller('ContactsListCtrl',['$rootScope', '$scope', function ($scope, $rootScope) {

		// var someDate = new Date();
		// var _contact = {
		// 	firstname: 'Jakub',
		// 	lastname: 'Mach',
		// 	nickname: 'Budmore',
		// 	notes: 'is Awesome!',
		// 	email: 'j.mach@budmore.pl',
		// 	url: 'http://budmore.pl',
		// 	dates: [
		// 		{
		// 			type: 'BIRTHDATE',
		// 			date: someDate,
		// 			year: someDate.getFullYear(),
		// 			month: someDate.getMonth(),
		// 			day: someDate.getDate()
		// 		}
		// 	]
		// };

		var firstnames = ['Jakub', 'Feliks', 'Kuba', 'Budmore'];
		var lastnames = ['Mach', 'Faivre', 'Frere', 'Eponge'];
		var dates = ['1987-05-21', '1987-04-25', '1955-08-27', '1966-06-06'];

		function generateRandomItem() {

			var firstname = firstnames[Math.floor(Math.random() * 3)];
			var lastname = lastnames[Math.floor(Math.random() * 3)];
			var birthdate = dates[Math.floor(Math.random() * 3)];


			var someDate = new Date(birthdate);
			var setBirthdate = {
				type: 'BIRTHDATE',
				date: someDate,
				year: someDate.getFullYear(),
				month: someDate.getMonth(),
				day: someDate.getDate()
			};


			return {
				firstname: firstname,
				lastname: lastname,
				dates: [
					setBirthdate
				]
			};
		}



		$scope.rowCollection = [];

		var i = 1;
		for (i; i < 5; i++) {
			$scope.rowCollection.push(generateRandomItem());
		}

		$scope.displayedCollection = [].concat($scope.rowCollection);

		//remove to the real data holder
		$scope.removeItem = function removeItem(row) {
			var index = $scope.rowCollection.indexOf(row);
			if (index !== -1) {
				$scope.rowCollection.splice(index, 1);
			}
		};





	}]);
