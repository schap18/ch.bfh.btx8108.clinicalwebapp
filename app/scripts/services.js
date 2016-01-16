/**
 * Created by jd on 31.10.15.
 *
 * Das File steuert die Login-Credentials sowie weitere Services.
 */

angular.module('starter.services', ['ngResource'])

  .factory('Session', function ($resource) {
    return $resource('http://localhost:5000/sessions/:sessionId');
  })

  //---------------------------------------------- Login --------------------------------------

  // Dieser Service regelt die Steuerung der Benutzercredentials. Hier aus Komplexitäts-Gründen mitttels
  // einfachem String implementiert.

.service('LoginService', function($q) {
  return {
    loginUser: function(name, pw) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      if (name == 'kurt@bfh.ch' || name == 'kurt' && pw == 'elisabeth') {
        deferred.resolve('Welcome ' + name + '!');
      } else {
        deferred.reject('Wrong credentials.');
      }
      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
})

//---------------------------------------------- Timeout Alerts --------------------------------------

// Der folgende Service regelt die Timeouts vom Anzeigen bestimmter Elemente (z.B. Haftungsausschuss)

    .service('showAlertSrvc', ['$timeout', function($timeout) {
      return function(delay) {
        var result = {hidden:true};
        $timeout(function() {
          result.hidden=false;
        }, delay);
        return result;
      };
    }])
    .controller('testController', function($scope, showAlertSrvc){
      $scope.text = showAlertSrvc(4500);
    })

    //---------------------------------------------- Steuerung Speichern der Liste --------------------------------------

    // Die folgende funktion steuert die Speicherung der Liste (alle Elemente, welche beim Erfassen eines Medikament
    // eingegeben werden) im lokalen Speicher.

  .factory('ListFactory', function() {

    var list = [];
    var listStore = localStorage.getItem("list");
    if (listStore != null && listStore != '' && angular.isArray(angular.fromJson(listStore))) {
      list = angular.fromJson(listStore);
    }
    var listSrv = {
      setList: function(newList) {
        list = newList;
        localStorage.setItem("list", angular.toJson(list));
        return true;
      },
      getList: function() {
        if (list != null) {
          return list;
        } else {
          return [];
        }
      }
    };
    return listSrv;
  });

;
