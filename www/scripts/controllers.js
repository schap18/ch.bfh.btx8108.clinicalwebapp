/**
 * Created by jd on 02.11.15. Version 1.0
 *
 * Die folgende Datei enthält alle Scripts, welche Java-Scripts Akvititäten starten.
 */

angular.module('starter.controllers', ['starter.services', 'ionic-timepicker'])

.controller('AppCtrl', function($scope, $ionicModal) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    /*// Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);*/
  };

})


  .controller('SessionsCtrl', function($scope, Session) {
    $scope.sessions = Session.query();
  })

  .controller('SessionCtrl', function($scope, $stateParams, Session) {
    $scope.session = Session.get({sessionId: $stateParams.sessionId});
  })

  .controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

 //Funktion für den Login. Bei korrekter Eingabe der Email und des Passwortes, wird die Seite "Browse" geöffnet.

    $scope.login = function() {
      LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
        $state.go('app.medikamente');
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
        });
      });
    }
  })

  //Beim Klick auf "Passwort vergessen", wird mit Eingabe der E-Mail das neue Passwort an die entsprechende
  //Email gesendet.

.controller('PopupCtrl', function($scope, $timeout, $q, $ionicPopup) {

  $scope.showAlert = function() {
    $ionicPopup.alert({
      title: 'Passwort vergessen',

      template: '<input type="text" placeholder="E-Mail" ng-model="data.username">',

      buttons: [{
          text: '<b>Zurücksetzen</b>',
          type: 'button-positive',

        onTap: function(e) {

          var alertPopup = $ionicPopup.alert({
            title: 'Danke!',
            template: 'Das Passwort wurde Ihnen per E-Mail zugesendet.'
          });
        }
      }],

      //Testfunktion für diverse Tests

    }).then(function(res) {
      console.log('Test Alert Box');
    });
  };

  $scope.logout = function() {

    window.location = 'app.login'
  }

  //Popup um zu konfirmieren, ob Medikament eingenommen wurde, oder ob man später erinnert werden möchte.

  $scope.showConfirm = function(item) {
    var confirmPopup = $ionicPopup.show({
      template: "<style>.popup { width:700px; text-align:center; }</style><h4>Medikament eingenommen?<h4/>",
     // title: 'MyTitle',
     // subTitle: 'MySubTitle',
      scope: $scope,
      buttons: [
        {
          text: 'Später erinnern',
          type: 'button-assertive',
          onTap: function (item) {
            $scope.showLater(item);
          }
        },

        {
          text: '<b>Ja</b>',
          type: 'button-balanced',
          onTap: function (item) {
            $scope.peekabooItem = true;
          }
        }
      ]
    });
  };

  //Pop-Up welches anzeigt, wann die Erinnerung wieder erscheinden soll.

  $scope.showLater = function(item) {
    var confirmPopup = $ionicPopup.show({
      template: "<style>.popup { width:700px; text-align:center; }</style><h4>Erinnerung in<h4/>",
      // title: 'MyTitle',
      // subTitle: 'MySubTitle',
      scope: $scope,
      buttons: [
        {
          text: '10 min',
          type: 'button-calm'
        },

        {
          text: '20 min',
          type: 'button-calm',
        }
      ]
    });
  };

  $scope.editMedikament = function(item) {
    var confirmPopup = $ionicPopup.show({
      template: "<style>.popup { width:700px; text-align:center; }</style><h4>Medikament<h4/>",
      // title: 'MyTitle',
      // subTitle: 'MySubTitle',
      scope: $scope,
      buttons: [
        {
          text: 'Löschen',
          type: 'button-assertive',
          onTap: function (item) {
            $scope.removeItem(item);
          }

        }
        //,
        //{
        //  text: 'Bearbeiten',
        //  type: 'button-calm',
        //}
      ]
    });
  };

})

//Dieser Controller regelt die Funktionen der Todo-Lsite (Hinzufügen, Anzeigen, Löschen etc.)

  .controller('TodoList', ['ListFactory', '$scope', '$ionicModal', '$timeout', '$q', '$ionicPopup',
    function(ListFactory, $scope, $ionicModal, $timeout, $q, $ionicPopup) {

      // Load the add / change dialog from the given template URL
      $ionicModal.fromTemplateUrl('templates/add-change-dialog.html', function(modal) {
        $scope.addDialog = modal;
      }, {
        scope: $scope,
        animation: 'slide-in-up'
      });

      //Dialog zum Hinzufügen anzeigen

      $scope.showAddChangeDialog = function(action) {
        $scope.action = action;
        $scope.addDialog.show();
        $scope.setupAutocomplete();
      };

      //Dialog zum Hinzufügen schliessen

      $scope.leaveAddChangeDialog = function() {
        // Remove dialog
        $scope.addDialog.remove();
        // Reload modal template to have cleared form
        $ionicModal.fromTemplateUrl('templates/add-change-dialog.html', function(modal) {
          $scope.addDialog = modal;
        }, {
          scope: $scope,
          animation: 'slide-in-up'
        });
      };

      // verschiedene Funktionen für Buttons (werden nicht verwendet)

      $scope.leftButtons = [];
      var addButton = {};
      addButton.type = "button-clear";
      addButton.content = '<i class="icon ion-ios7-plus-outline"></i>';
      addButton.tap = function(e) {
        $scope.showAddChangeDialog('add');
      };
      $scope.leftButtons.push(addButton);

      // Define item buttons
      $scope.itemButtons = [{
        text: 'Delete',
        type: 'button-assertive',
        onTap: function(item) {
          $scope.removeItem(item);
        }
      }, {
        text: 'Edit',
        type: 'button-calm',
        onTap: function(item) {
          $scope.showEditItem(item);
        }
      }];

      // Get list from storage
      $scope.list = ListFactory.getList();

      // Used to cache the empty form for Edit Dialog
      $scope.saveEmpty = function(form) {
        $scope.form = angular.copy(form);
      }

      $scope.addItem = function(form) {
        var newItem = {};
        // Add values from form to object
        // newItem.description = form.description.$modelValue.title;//$scope.selectedMedi;
        newItem.description = form.description.$modelValue ? form.description.$modelValue.title: $('input#description_value').val();
        newItem.intervall = $scope.intervall; //form.intervall.$modelValue;
        newItem.remind_date = form.remind_date.$viewValue;
        newItem.bedarf = form.bedarf.$modelValue;
        if (!newItem.bedarf) {
          newItem.remind_time1 = $scope.remind_time1.inputEpochTime; //form.remind_time1.$modelValue;
          newItem.remind_time2 = $scope.remind_time2.inputEpochTime;
          newItem.remind_time3 = $scope.remind_time3.inputEpochTime;
          newItem.remind_time4 = $scope.remind_time4.inputEpochTime;
          newItem.remind_time5 = $scope.remind_time5.inputEpochTime;
          newItem.remind_time6 = $scope.remind_time6.inputEpochTime;
          newItem.pushNotification = form.pushNotification.$modelValue;
        }

        // Save new list in scope and factory
        $scope.list.push(newItem);
        ListFactory.setList($scope.list);

        // Close dialog
        $scope.leaveAddChangeDialog();
      };

      $scope.removeItem = function(item) {
        // Search & Destroy item from list
        $scope.list.splice($scope.list.indexOf(item), 1);

        // Save list in factory
        ListFactory.setList($scope.list);
      }

      $scope.showEditItem = function(item) {

        //console.log("Item selected");

        // Remember edit item to change it later
        //$scope.tmpEditItem = item;

        // Open dialog
        //$scope.showAddChangeDialog('change');

        // Preset form values
        //$('input#description_value').val(item.description);
        //$scope.form.description.$setViewValue(item.description);
        //$scope.form.intervall.$setViewValue(item.intervall);
        //$scope.form.remind_date.$setViewValue(item.remind_date);
        //$scope.form.bedarf.$setViewValue(item.bedarf);
        //$scope.form.remind_time1.$setViewValue(item.remind_time1.inputEpochTime);
        //$scope.form.description.$setViewValue(item.remind_time2.inputEpochTime);
        //$scope.form.description.$setViewValue(item.remind_time3.inputEpochTime);
        //$scope.form.description.$setViewValue(item.remind_time4.inputEpochTime);
        //$scope.form.description.$setViewValue(item.remind_time5.inputEpochTime);
        //$scope.form.description.$setViewValue(item.remind_time6.inputEpochTime);
        //$scope.form.description.$setViewValue(item.pushNotification);



      };

      $scope.editItem = function(form) {

        var item = {};
        item.description = form.description.$modelValue;

        var editIndex = ListFactory.getList().indexOf($scope.tmpEditItem);
        $scope.list[editIndex] = item;
        // Set first item to default

        ListFactory.setList($scope.list);

        $scope.leaveAddChangeDialog();
      }


      // Elemente der Todoliste ausblenden

      $scope.peekabooItem = false;

      $scope.hideManual = true;

      /*myVar = setTimeout(hideElement, 3000);

      function hideElement() {
        $scope.hideManual = true;
      }*/

      // Elemente der Todoliste die angezeigt werden

      //????????????????


      // Diese Funktion regelt die Erfassung und das Speichern der Einnahme-Zeit/-en

      function createRemindTimeObject(name) {
        return {
          inputEpochTime: 0,  //Optional
          step: 5,  //Optional
          format: 24,  //Optional
          titleLabel: 'Time',  //Optional
          setLabel: 'Set',  //Optional
          closeLabel: 'Close',  //Optional
          setButtonType: 'button-positive',  //Optional
          closeButtonType: 'button-stable',  //Optional
          callback: function (val) {    //Mandatory
            timePickerCallback(val, name);
          }
        };
      }
      $scope.remind_time1 = createRemindTimeObject('remind_time1');
      $scope.remind_time2 = createRemindTimeObject('remind_time2');
      $scope.remind_time3 = createRemindTimeObject('remind_time3');
      $scope.remind_time4 = createRemindTimeObject('remind_time4');
      $scope.remind_time5 = createRemindTimeObject('remind_time5');
      $scope.remind_time6 = createRemindTimeObject('remind_time6');


      function timePickerCallback(val, name) {
        if (typeof (val) === 'undefined') {
          console.log('Time not selected');
        } else {
          var selectedTime = new Date(val * 1000);
          $scope[name].inputEpochTime = val;
          console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');

        };
      }

      // Timed Message


      function myFunction() {
        myVar = setTimeout(alertFunc, 3000);
      }

      function alertFunc() {
        alert("Hello!");
      }
      // Hier wird eine Condition ausgeführt, welche die Uhrzeit abhändig von der Auswahl des Intervalls einblendet/ausblendet.

      $scope.taegl1 = true;
      $scope.taegl2 = true;
      $scope.taegl3 = true;
      $scope.taegl4 = true;
      $scope.taegl5 = true;
      $scope.taegl6 = true;

      // Inhalt des Dropdowns

      $scope.data = { 'numbers' : ["1x täglich", "2x täglich", "3x täglich", "4x täglich", "5x täglich", "6x täglich"]};

      //Funktion zum Einblenden- & Ausblenden verschiedener Intervalle je nach Auswahl

      $scope.checkCondition = function (key) {
        $scope.intervall = key;

        $scope.taegl1 = true;
        $scope.taegl2 = true;
        $scope.taegl3 = true;
        $scope.taegl4 = true;
        $scope.taegl5 = true;
        $scope.taegl6 = true;

        if(key === '1x täglich'){
          $scope.taegl1=false;
        }
        else if (key =='2x täglich') {
          $scope.taegl1=false;
          $scope.taegl2=false;
        }
        else if (key =='3x täglich') {
          $scope.taegl1=false;
          $scope.taegl2=false;
          $scope.taegl3=false;
        }
        else if (key =='4x täglich') {
          $scope.taegl1=false;
          $scope.taegl2=false;
          $scope.taegl3=false;
          $scope.taegl4=false;
        }
        else if (key =='5x täglich') {
          $scope.taegl1=false;
          $scope.taegl2=false;
          $scope.taegl3=false;
          $scope.taegl4=false;
          $scope.taegl5=false;
        }
        else if (key =='6x täglich') {
          $scope.taegl1=false;
          $scope.taegl2=false;
          $scope.taegl3=false;
          $scope.taegl4=false;
          $scope.taegl5=false;
          $scope.taegl6=false;
        }
      };

      /////////////////////////////////////// Timed TestPop Up


      //function timePopup(val) {
      //
      //  $scope.refreshAt = function (hours, minutes, seconds) {
      //    var now = new Date();
      //    var then = new Date();
      //
      //    console.log('set time is' + remind_time1);
      //
      //    if (now.getHours() > hours || (now.getHours() == hours && now.getMinutes() > minutes) || now.getHours() == hours && now.getMinutes() == minutes && now.getSeconds() >= seconds) {
      //      then.setDate(now.getDate() + 1);
      //    }
      //    then.setHours(hours);
      //    then.setMinutes(minutes);
      //    then.setSeconds(seconds);
      //
      //    var timeout = (then.getTime() - now.getTime());
      //    setTimeout(showMe, timeout);
      //    console.log('set timeout for in ' + timeout + 'ms');
      //  };
      //  refreshAt(11, 8, 0);
      //
      //  //  refreshAt(selectedTime.getUTCHours(), selectetTime.getUTCMinutes(), 00);
      //  //  refreshAt(remind_time1);
      //  //  refreshAt(remind_time2);
      //
      //  var showMe = $ionicPopup.show({
      //    template: "<style>.popup { width:700px; text-align:center; }</style><h4>Nimm dis Medi<h4/>",
      //    // title: 'MyTitle',
      //    // subTitle: 'MySubTitle',
      //    scope: $scope,
      //    buttons: [
      //      {
      //        text: 'OK',
      //        type: 'button-calm'
      //      },
      //
      //      {
      //        text: 'No. Kein Bock',
      //        type: 'button-assertive',
      //      }
      //    ]
      //  });
      //}

      //
        //////////////////////// Timed PopUp end



      //---------------------------------------------- Autocomplete--------------------------------------

      //Die folgende Funktion ruft den Array aus medilist.js auf und durchsucht deren Elemente gemäss der Tastatureingabe
      //des Benutzers bei der Erfassung eines Medikaments.

      $scope.medilist = _.map(medilist, function (item) {
        return {name: item}
      });
      $scope.setupAutocomplete = function (){

      };

      // ---------------------------------------------End Autocomplete--------------------------------

    }
  ])

// Diese Funktion steuert die Formatierung und Umrechnung der Zeit

  .directive('standardTimeNoMeridian', function() {
    return {
      restrict: 'AE',
      replace: true,
      scope: {
        etime: '=etime'
      },
      template: "<strong>{{stime}}</strong>",
      link: function(scope, elem, attrs) {

        scope.stime = epochParser(scope.etime, 'time');

        function prependZero(param) {
          if (String(param).length < 2) {
            return "0" + String(param);
          }
          return param;
        }

        function epochParser(val, opType) {
          if (val === null) {
            return "00:00";
          } else {
            if (opType === 'time') {
              var hours = parseInt(val / 3600);
              var minutes = (val / 60) % 60;

              return (prependZero(hours) + ":" + prependZero(minutes));
            }
          }
        }

        scope.$watch('etime', function(newValue, oldValue) {
          scope.stime = epochParser(scope.etime, 'time');
        });

      }
    };
  });
;


