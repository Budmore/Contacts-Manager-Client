'use strict';

/**
 * General module with common code.
 */

angular
	.module('authModule', [
		'ngResource',
		'ui.router',
		'ngMessages',

		'authModule.controllers',
		'authModule.services'
	])

	.config(['$stateProvider',
	function($stateProvider) {

		$stateProvider
			.state('login', {
				title: 'Login',
				url: '/login',
				templateUrl: 'modules/auth/views/login-form.html'
			})
			.state('register', {
				title: 'register',
				url: '/register',
				templateUrl: 'modules/auth/views/register-form.html'
			});

	}])

	.run([
	'$rootScope',
	'$state',
	'sessionService',
	'authService',
	function($rootScope, $state, sessionService, authService) {

		$rootScope.$on('AUTH::LOGOUT', function() {
			sessionService.clearSession();
			$state.go('login');
		});


		$rootScope.$on('$stateChangeStart', function (event, nextState) {

			// no need to redirect if user is authenticated
			if ( sessionService.getSession().isLogged){
				return;
			}

			if (nextState.forLogged && $rootScope.appReady) {
				event.preventDefault();
				$state.go('login');
			}
		});



		$rootScope.appReady = false;
		$rootScope.session = sessionService.getSession();

		var hasToken = sessionService.checkSession();

		// Prevent validate token for demo user
		if (hasToken && hasToken.token === 'demo-mode') {
			sessionService.setSession(hasToken.token);
			$rootScope.isDemoMode = true;
			$rootScope.appReady = true;
			return;
		}


		if (hasToken && hasToken.token) {
			authService.checkToken().then(
				function checkTokenSuccess() {
					sessionService.setSession(hasToken.token);

				}, function checkTokenError(err) {
					if (err.data) {
						sessionService.clearSession();
						$state.go('login');
					}
				}
			).finally(function() {
				$rootScope.appReady = true;
			});

		} else {
			$rootScope.appReady = true;
		}


	}]);



