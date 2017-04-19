'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
    'ui.router'
])
    .config(appConfig);

appConfig.$inject = ['$stateProvider', '$locationProvider'];
function appConfig($stateProvider, $locationProvider) {
    $stateProvider
        .state({
            name: 'main',
            url: '/',
            template: '<h1>UI-router main state here</h1>'
        });

    $locationProvider.html5Mode(true);
}