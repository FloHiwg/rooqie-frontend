'use strict';
angular.module('app', ['ionic', 'onezone-datepicker'])
  .config(function($stateProvider, $urlRouterProvider, $provide){
    $stateProvider
    .state('loading', {
      url: '/loading',
      template: '<ion-spinner style="text-align: center; margin-top: 50%;"></ion-spinner>',
      controller: 'LoadingCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/authentication/login.html',
      controller: 'LoginCtrl'
    })
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'app/layout/layout.html',
      controller: 'LayoutCtrl'
    })
    .state('app.recommendations', {
      url: '/recommendations',
      views: {
        'menuContent': {
          templateUrl: 'app/recommendations/recommendations.html',
          controller: 'RecommendationsCtrl'
        }
      }
    })
    .state('app.userevents', {
      url: '/userevents',
      views: {
        'menuContent': {
          templateUrl: 'app/userevents/userevents.html',
          controller: 'UsereventsCtrl'
        }
      }
    })
    .state('app.createevent', {
      url: '/createevent',
      views: {
        'menuContent': {
          templateUrl: 'app/createevent/createevent.html',
          controller: 'CreateeventCtrl'
        }
      }
    })
    .state('app.createdate', {
      url: '/createdate',
      views: {
        'menuContent': {
          templateUrl: 'app/createdate/createdate.html',
          controller: 'CreatedateCtrl'
        }
      }
    })








    .state('app.welcome', {
      url: '/onboarding/welcome',
      views: {
        'menuContent': {
          templateUrl: 'app/onboarding/welcome/welcome.html',
          controller: 'WelcomeCtrl'
        }
      }
    })

    .state('app.onboarding1', {
      url: '/onboarding/onboarding1',
      views: {
        'menuContent': {
          templateUrl: 'app/onboarding/onboarding1/onboarding1.html',
          controller: 'Onboarding1Ctrl'
        }
      }
    })
    .state('app.onboarding2', {
      url: '/onboarding/onboarding2',
      views: {
        'menuContent': {
          templateUrl: 'app/onboarding/onboarding2/onboarding2.html',
          controller: 'Onboarding2Ctrl'
        }
      }
    })
    .state('app.onboarding3', {
      url: '/onboarding/onboarding3',
      views: {
        'menuContent': {
          templateUrl: 'app/onboarding/onboarding3/onboarding3.html',
          controller: 'Onboarding3Ctrl'
        }
      }
    })
    .state('app.onboarding4', {
      url: '/onboarding/onboarding4',
      views: {
        'menuContent': {
          templateUrl: 'app/onboarding/onboarding4/onboarding4.html',
          controller: 'Onboarding4Ctrl'
        }
      }
    })
    // .state('app.onboarding5', {
    //   url: '/onboarding/onboarding5',
    //   views: {
    //     'menuContent': {
    //       templateUrl: 'app/onboarding/onboarding5/onboarding5.html',
    //       controller: 'Onboarding5Ctrl'
    //     }
    //   }
    // })




    .state('app.legal', {
      url: "/legal",
      views: {
        'menuContent': {
          templateUrl: 'app/legal/datenschutz.html',
          controller: 'LegalCtrl'
        },
        'menuContent': {
          templateUrl: 'app/legal/abmeldebestaetigung.html',
          controller: 'LegalCtrl'
        },
        'menuContent': {
          templateUrl: 'app/legal/abmelden.html',
          controller: 'LegalCtrl'
        },
        'menuContent': {
          templateUrl: 'app/legal/einstellungen.html',
          controller: 'LegalCtrl'
        },
        'menuContent': {
          templateUrl: 'app/legal/impressum.html',
          controller: 'LegalCtrl'
        }
      }
    })

    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'app/profile/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })
    .state('eventdetail', {
      url: '/eventdetail/:id',
      templateUrl: 'app/eventdetail/eventdetail.html',
      controller: 'EventdetailCtrl'
    })
    .state('eventjoin', {
      url: '/eventjoin/:id/:join',
      templateUrl: 'app/eventjoin/eventjoin.html',
      controller: 'EventjoinCtrl'
    })
    .state('eventleave', {
      url: '/eventleave/:id/:join',
      templateUrl: 'app/eventleave/eventleave.html',
      controller: 'EventleaveCtrl'
    });
    $urlRouterProvider.otherwise('/loading');
  })
  .run(function($rootScope){
    $rootScope.categories = {
      "trip": {
        "name": "Ausflug",
        "image": "img/categories/trip_sea.jpg"
      },
      "party": {
        "name": "Feiern",
        "image": "img/categories/cocktails.jpg"
      },
      "sightseeing": {
        "name": "Sightseeing",
        "image": "img/categories/trip_english_garden.jpg"
      },
      "breakfast": {
        "name": "Frühstück",
        "image": "img/categories/breakfast.png"
      },
      "sport": {
        "name": "Sport",
        "image": "img/categories/sports_foodball.jpg"
      },
      "tatort": {
        "name": "Tatort",
        "image": "img/categories/tatort.jpg"
      },
      "coffee": {
        "name": "Café",
        "image": "img/categories/coffee.png"
      },
      "cooking": {
        "name": "Kochen",
        "image": "img/categories/course_cooking.jpg"
      },
      "cinema": {
        "name": "Kino",
        "image": "img/categories/movienight.jpg"
      },
      "museum": {
        "name": "Museum",
        "image": "img/categories/museum.png"
      }
    };
    $rootScope.safeApply = function(fn){
      var phase = this.$root ? this.$root.$$phase : this.$$phase;
      if(phase === '$apply' || phase === '$digest'){
        if(fn && (typeof(fn) === 'function')){
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };
  });
