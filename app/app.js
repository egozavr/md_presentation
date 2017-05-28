'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
    'ui.router', 'ngMaterial', 'ng-showdown'
])
    .config(appConfig)
    // .controller('test', TestController)
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
        controller: ControlPanelController,
        bindings: {
            onZoomIn: '&',
            onZoomOut: '&',
            onZoomReset: '&',
            disableZoomIn: '<',
            disableZoomOut: '<',
            disableZoomReset: '<',
            zoom: '<'
        }
    })
    .service('slides', SlidesService)
    .service('viewOpts', ViewOptsService)
;

appConfig.$inject = ['$stateProvider', '$locationProvider', '$showdownProvider',
    '$mdThemingProvider', '$mdAriaProvider', 'githubOpts'];
function appConfig($stateProvider, $locationProvider, $showdownProvider,
                   $mdThemingProvider, $mdAriaProvider, githubOpts) {
    $stateProvider
        .state({
            name: 'main',
            views: {
                main: {component: 'main'},
            },
            url: '/',
            resolve: {
                slideUrls: function (slides) {
                    return slides.getSlidesRefs();
                }
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
                mdText: function ($stateParams, slides) {
                    return slides.getSlide($stateParams.slideUrl);
                }
            },
        })
    ;

    $locationProvider.html5Mode(true);

    $mdThemingProvider.theme('default')
        .primaryPalette('grey', {'default': '400'}).accentPalette('red');

    $mdAriaProvider.disableWarnings();

    for (let key in githubOpts) $showdownProvider.setOption(key, githubOpts[key]);
    $showdownProvider.loadExtension('codehighlight');
}

SlidesService.$inject = ['$http', 'PRESENTATION_DIR'];
function SlidesService($http, PRESENTATION_DIR) {

    this.getSlidesRefs = getSlidesRefs;
    this.getSlide = getSlide;

    function getSlidesRefs() {
        return $http.get(PRESENTATION_DIR).then(function (resp) {
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
        if (!(URL === null)) {
            return $http.get(URL).then(
                function (response) {
                    return response.data;
                }
            );
        }
        return null;
    }

}

function ViewOptsService() {
    let currentSlideIndex = -1;
    let slideUrls = [];

    Object.defineProperty(this, 'last', {
        get: function () {
            return (currentSlideIndex + 1 === slideUrls.length);
        }
    });

    Object.defineProperty(this, 'first', {
        get: function () {
            return (currentSlideIndex <= 0);
        }
    });

    Object.defineProperty(this, 'current', {
        get: function () {
            return Math.max(0, currentSlideIndex + 1);
        }
    });

    Object.defineProperty(this, 'total', {
        get: function () {
            return slideUrls.length;
        }
    });

    this.getCurrentSlide = function () {
        if (slideUrls[currentSlideIndex]) return slideUrls[currentSlideIndex];
        return null;
    };

    this.setSlideUrls = function (ar) {
        if (ar[0]) {
            slideUrls = ar;
            currentSlideIndex = 0;
        }
    };

    this.getNextSlide = function () {
        let res = null;
        if (!this.last) res = slideUrls[++currentSlideIndex];
        return res;
    };

    this.getPreviousSlide = function () {
        let res = null;
        if (!this.first) res = slideUrls[--currentSlideIndex];
        return res;
    };
}

function MainController(viewOpts, $state) {
    let self = this;

    this.$onInit = function () {

        this.zoom = 1.0;
        this.zoomStyle = {zoom: this.zoom};

        if (this.slideUrls.length > 0) {
            viewOpts.setSlideUrls(this.slideUrls);
            $state.go('slide', {slideUrl: viewOpts.getCurrentSlide()});
        }
        else (
            this.empty = true
        )
    };

    this.zoomIn = function () {
        this.zoom = Math.min((Math.floor(this.zoom * 100) + 10) / 100, 2.0);
        this.zoomStyle = {zoom: this.zoom};
    };

    this.dsblZoomIn = function () {
        return this.zoom === 2.0;
    };

    this.zoomOut = function () {
        this.zoom = Math.max((Math.floor(this.zoom * 100) - 10) / 100, .8);
        this.zoomStyle = {zoom: this.zoom};
    };

    this.dsblZoomOut = function () {
        return this.zoom === 0.8;
    };

    this.zoomReset = function () {
        this.zoom = 1.0;
        this.zoomStyle = {zoom: this.zoom};
    };

    this.dsblZoomReset = function () {
        return this.zoom === 1.0;
    };
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
        self.opts = viewOpts;
    };

    self.goNext = function () {
        if(!self.opts.last) $state.go('slide', {slideUrl: viewOpts.getNextSlide()});
    };

    self.goPrev = function () {
        if(!self.opts.first) $state.go('slide', {slideUrl: viewOpts.getPreviousSlide()});
    };

    function onKeyUp(event) {
        event.preventDefault();
        const keyCode = event.keyCode;
        if (keyCode === 39 || keyCode === 32) self.goNext();
        if (keyCode === 37 || keyCode === 8) self.goPrev();
    }

    document.addEventListener('keyup', onKeyUp);

    self.$onDestroy = function () {
        document.removeEventListener('keyup', onKeyUp);
    };
}