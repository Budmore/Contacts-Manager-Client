angular.module('contactsModule')
	.directive('getDate', function() {

		var today = new Date();
		today.setHours(0,0,0,0);
		var todayMonth = today.getMonth();
		var todayFullYear = today.getFullYear();


		return {

			restrict: 'E',
			template: '{{ parsedDate }}',
			scope: {
				date: '='
			},
			link: function(scope, element, attrs){


				scope.$watch('date', function(date) {
					var tempDate;
					var temp = date;

					if (temp && moment(temp.date).isValid() ) {

						tempDate = new Date(temp.date);
						tempDate.setHours(0,0,0,0);
						tempDate.setFullYear(todayFullYear);

						if (tempDate.getMonth() < todayMonth) {
							tempDate.setFullYear(todayFullYear + 1);
						}

						var msg = moment(today).to(tempDate);

						if (tempDate.getMonth() === todayMonth &&  tempDate.getDate() === today.getDate()) {
							msg = 'Today!'
						}

						scope.parsedDate = msg;

					}



				});

			}
		}

	});
