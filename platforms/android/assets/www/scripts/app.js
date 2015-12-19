/**
 * Created by jd on 02.11.15. Version 1.0
 *
 * Die folgende Datei enthält alle Scripts, welche die Java-Scripts der Navigation enthält.
 */

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var ionicApp = angular.module('starter', ['ionic', 'starter.controllers', 'ionic-timepicker', 'angucomplete-alt', 'ngCordova']);

ionicApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

/**
Die folgenden Scripts konfigurieren die Navigation der Menüelemente.
 */

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

    .state('app.medikamente', {
      url: '/medikamente',
      views: {
        'menuContent': {
          templateUrl: 'templates/medikamente.html'
        }
      }
    })

  .state('app.todo', {
      url: '/todo',
      views: {
        'menuContent': {
          templateUrl: 'templates/todo.html'
        }
      }
    })

    .state('app.medikationsplan', {
      url: '/medikationsplan',
      views: {
        'menuContent': {
          templateUrl: 'templates/medikationsplan.html'
        }
      }
    })

    .state('app.news', {
      url: '/news',
      views: {
        'menuContent': {
          templateUrl: 'templates/news.html'
        }
      }
    })

      .state('app.compendium', {
        url: '/compendium',
        views: {
          'menuContent': {
            templateUrl: 'templates/compendium.html'
          }
        }
      })

      .state('app.symptoms', {
        url: '/symptoms',
        views: {
          'menuContent': {
            templateUrl: 'templates/symptoms.html'
          }
        }
      })

    .state('app.einstellungen', {
      url: '/einstellungen',
      views: {
        'menuContent': {
          templateUrl: 'templates/einstellungen.html'
        }
      }
    })

    .state('app.hilfe', {
      url: '/hilfe',
      views: {
        'menuContent': {
          templateUrl: 'templates/hilfe.html'
        }
      }
    })

    .state('app.sessions', {
      url: "/sessions",
      views: {
        'menuContent': {
          templateUrl: "templates/sessions.html",
          controller: 'SessionsCtrl'
        }
      }
    })

    .state('app.session', {
      url: "/sessions/:sessionId",
      views: {
        'menuContent': {
          templateUrl: "templates/session.html",
          controller: 'SessionCtrl'
        }
      }
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })

    .state('app.jdplayground', {
      url: '/jdplayground',
      views: {
        'menuContent': {
          templateUrl: 'templates/jdplayground.html'
        }
      }
    })

      .state('app.statistik', {
        url: '/statistik',
        views: {
          'menuContent': {
            templateUrl: 'templates/statistik.html'
          }
        }
      })

  ;;
  // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');


});
