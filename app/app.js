'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
    'ui.router', 'ng-showdown'
])
    .config(appConfig)
    .controller('test', TestController)
    .constant('githubOpts', { //  the github object was taken from flavor.github in showdown.js
        omitExtraWLInCodeBlocks: true,
        prefixHeaderId: 'user-content-',
        simplifiedAutoLink: true,
        literalMidWordUnderscores: true,
        strikethrough: true,
        tables: true,
        tablesHeaderId: true,
        ghCodeBlocks: true,
        tasklists: true
    })
;

appConfig.$inject = ['$stateProvider', '$locationProvider', '$showdownProvider', 'githubOpts'];
function appConfig($stateProvider, $locationProvider, $showdownProvider, githubOpts) {
    $stateProvider
        .state({
            name: 'main',
            url: '/',
            template: '<div class="presentation" ng-bind-html="$ctrl.md"></div>',
            controller: 'test',
            controllerAs: '$ctrl'
        });

    $locationProvider.html5Mode(true);

    for (let key in githubOpts) $showdownProvider.setOption(key, githubOpts[key]);
    $showdownProvider.loadExtension('codehighlight');
}

function TestController($http, $showdown) {
    let self = this;
    $http.get('/test.md').then(function(response) {
        self.md = $showdown.makeHtml(response.data);
    });
}

