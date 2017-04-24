'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
    'ui.router', 'ngMaterial', 'ng-showdown'
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
    .constant('PRESENTATION_DIR', '/presentation/')
    .component('main', {
        templateUrl: '/html/main.html',
        bindings: {
            slideUrls: '<'
        },
        controller: MainController
    })
    .component('presentation', {
        templateUrl: '/html/presentation.html',
        controller: PresentationController,
        bindings: {
            mdText: '<'
        }
    })
    .component('controlPanel', {
        templateUrl: '/html/control-panel.html',
        controller: ControlPanelController
    })
    .service('slides', SlidesService)
    .service('viewOpts', ViewOptsService)
;

appConfig.$inject = ['$stateProvider', '$locationProvider', '$showdownProvider', 'githubOpts'];
function appConfig($stateProvider, $locationProvider, $showdownProvider, githubOpts) {
    $stateProvider
        .state({
            name: 'main',
            views: {
                main: {component: 'main'},
            },
            url: '/',
            resolve: {
                slideUrls: function (slides) { return slides.getSlidesRefs();}
            }
        })
        .state({
            name: 'slide',
            parent: 'main',
            params: {
                slideUrl: null
            },
            views: {
                presentation: {
                    component: 'presentation',

                }
            },
            resolve: {
                mdText: function($stateParams, slides) {
                    return slides.getSlide($stateParams.slideUrl);
                }
            },
        })
    ;

    $locationProvider.html5Mode(true);

    for (let key in githubOpts) $showdownProvider.setOption(key, githubOpts[key]);
    $showdownProvider.loadExtension('codehighlight');
}

function MainController(viewOpts) {
    this.$onInit = function () {
        viewOpts.slideUrls = this.slideUrls;
    }
}

function TestController($http, $showdown) {
    let self = this;
    $http.get('/test.md').then(function(response) {
        self.md = $showdown.makeHtml(response.data);
    });
    $http.get('/highlight/').then(function(resp) {
        console.log(resp);
    });
}

SlidesService.$inject = ['$http', 'PRESENTATION_DIR'];
function SlidesService($http, PRESENTATION_DIR) {

    this.getSlidesRefs = getSlidesRefs;
    this.getSlide = getSlide;

    function getSlidesRefs() {
        return $http.get(PRESENTATION_DIR).then(function(resp) {
            const data = resp.data;
            const hrefRegExp = /href="(.*\.md)"/gi;
            let hrefs = [];

            let match;
            while ((match = hrefRegExp.exec(data)) !== null) {
                hrefs.push(match[1]);
            }
            return hrefs;
        })
    }

    function getSlide(URL) {
        return $http.get(URL).then(
            function (response) {
                return response.data;
            }
        )
    }

}

function ViewOptsService() {
    this.currentSlide = '';
    this.currentSlideIndex = -1;
    this.slideUrls = [];
}

PresentationController.$inject = ['$showdown'];
function PresentationController($showdown) {

    let self = this;

    self.$onInit = function () {
        self.md = $showdown.makeHtml(self.mdText);
    };
}

function ControlPanelController(viewOpts, $state) {
    let self = this;


    self.$onInit = function () {
        console.log(viewOpts.slideUrls)
    };

    self.goNext = function() {
        console.log(self.urls);
        $state.go('slide', {slideUrl: viewOpts.slideUrls[viewOpts.currentSlide++]})
    };
}