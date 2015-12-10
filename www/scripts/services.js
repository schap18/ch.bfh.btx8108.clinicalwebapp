/**
 * Created by jd on 31.10.15.
 *
 * Das File steuert die Login-Credentials und kontrolliert werden Richtigkeit.
 */

angular.module('starter.services', ['ngResource'])

  .factory('Session', function ($resource) {
    return $resource('http://localhost:5000/sessions/:sessionId');
  })

.service('LoginService', function($q) {
  return {
    loginUser: function(name, pw) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      if (name == 'kurt@bfh.ch' && pw == 'elisabeth') {
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

  //This function saves the List of the Medication locally

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
