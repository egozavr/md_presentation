'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
    'ui.router', 'ng-showdown'
])
    .config(appConfig)
    .controller('test', TestController);

appConfig.$inject = ['$stateProvider', '$locationProvider'];
function appConfig($stateProvider, $locationProvider) {
    $stateProvider
        .state({
            name: 'main',
            url: '/',
            template: '<div markdown-to-html="$ctrl.md"></div>',
            controller: 'test',
            controllerAs: '$ctrl'
        });

    $locationProvider.html5Mode(true);
}

function TestController($http) {
    let self = this;
    $http.get('/test.md').then(function(response) {
        self.md = response.data;
    });
}