/**
 * Created by jd on 02.11.15. Version 1.0
 *
 * Die folgende Datei enthält ein Grossteil der Scripts, welche Java-Script Akvititäten starten.
 */

angular.module('starter.controllers', ['starter.services', 'ionic-timepicker', 'ngCordova', 'chart.js'])

.controller('AppCtrl', function($scope, $ionicModal) {

  // Login-Modal von Ionic (wird in der App nicht komplett verwendet)

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

//--------------------------------------------------------------------------------------------------//


// Controller, welche die Sessions steuert

  .controller('SessionsCtrl', function($scope, Session) {
    $scope.sessions = Session.query();
  })

  .controller('SessionCtrl', function($scope, $stateParams, Session) {
    $scope.session = Session.get({sessionId: $stateParams.sessionId});
  })

  //--------------------------------------------------------------------------------------------------//


  // Controller, welcher alle Funktionen des Logins steuert

  .controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

    // Bei korrekter Eingabe der Email/Benutzername und des Passwortes, wird die View "Medikamente" geöffnet.
    // bei falscher Passworteingabe erscheint ein Popup

    $scope.login = function() {
      LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
        $state.go('app.medikamente');
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login nicht möglich!',
          template: 'Bitte kontrollieren Sie Ihr Passwort!'
        });
      });
    }
  })

  // Beim Klick auf "Passwort vergessen", wird mit Eingabe der E-Mail das Passwort mittels LocalNotification als
  // Benachrichtigung an das Device gepusht und angezeigt.

.controller('PopupCtrl', function($scope, $timeout, $q, $ionicPopup, $cordovaLocalNotification) {

  $scope.showAlert = function() {
    $ionicPopup.alert({
      title: 'Passwort vergessen',

      template: '<input type="text" placeholder="E-Mail" ng-model="data.username" value="data.username">',

      buttons: [{
          text: '<b>Zusenden</b>',
          type: 'button-positive',

        onTap: function(e) {

          var alarmTime = new Date();

          // Diese Condition wird nur ausgeführt, wenn die App auf einem Device läuft. Beim Testen in einem
          // Browser wirft dieser Codeteil ansonsten eine Exception und wird deshalb übersprungen (Testen ist
          // nur auf dem Device möglich)

          if (window.cordova) {
            $cordovaLocalNotification.add({
              id: "543",
              at: alarmTime,
              title: "Von: RemindMed   Betreff: Ihr Passwort",
              text: "Guten Tag Kurt! Ihr Passwort lautet: elisabeth...",
              icon: "res://ic_launcher",
              smallIcon: "res://ic_launcher"
            }).then(function () {
              console.log("The notification was set");
            }, function (e) {
              console.log("notification error: ", e);
            });
          }

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

  // Logout Funktion mittels redirect zur Login-View

  $scope.logout = function() {
    window.location = '#/app/login'
  }

  //--------------------------------------------------------------------------------------------------//

  // Diese Funktion regelt die Weiterleitung zur Demonstration des Scannens der Medikamenten-Verpackung.

  $scope.redirectMediscan = function() {

    // Ton bei erfolgreichem Scan abspielen (funktioniert leider nicht)

    /*$scope.playSound = function() {
      console.log("start function")
      var my_media = new Media('images/notification.mp3');
      console.log("media loaded")
      my_media.play();
    }*/

    // Nach einem Timeout mit 4 sek delay wird ein Popup angezeigt und nach Klicken auf den Ok-Button
    // die View "Medikamente" aufgerufen

    setTimeout(function () {

        var confirmPopup = $ionicPopup.show({
          template: "<style>.popup { width:700px; text-align:center; }</style><h4>Medikament wurde erfolgreich gescannt<h4/>",
          scope: $scope,
          buttons: [
            {
              text: 'Ok',
              type: 'button-energized',
              onTap: function (item) {
                window.location = '#/app/medikamente';
              }
            }
          ]
        });
    }, 4000) /* 4000 = 4 seconds */

  }

  // Diese Funktion regelt die Weiterleitung zur Demonstration des Scannens des Mediplans.

  $scope.redirectPlanscan = function() {

    // Ton bei erfolgreichem Scan abspielen (funktioniert leider nicht)

    /*$scope.playSound = function() {
     console.log("start function")
     var my_media = new Media('images/notification.mp3');
     console.log("media loaded")
     my_media.play();
     }*/

    // Nach einem Timeout mit 4 sek delay wird ein Popup angezeigt und nach Klicken auf den Ok-Button
    // die View "Medikamente" aufgerufen

    setTimeout(function () {

      var confirmPopup = $ionicPopup.show({
        template: "<style>.popup { width:700px; text-align:center; }</style><h4>Medikationsplan wurde erfolgreich gescannt<h4/>",
        scope: $scope,
        buttons: [
          {
            text: 'Ok',
            type: 'button-calm',
            onTap: function (item) {
              window.location = '#/app/medikationsplan';
            }
          }
        ]
      });
    }, 4000) /* 4000 = 4 seconds */

  }

  //--------------------------------------------------------------------------------------------------//

  // Popup um zu konfirmieren, ob Medikament eingenommen wurde, oder ob man später erinnert werden möchte.
  // Wurde zu Testzwecken verwendet. Wird in der aktuellen Version der App nicht verwendet. (Stand 15.1.2016)

  $scope.showConfirm = function(item) {
    var confirmPopup = $ionicPopup.show({
      template: "<style>.popup { width:700px; text-align:center; }</style><h4>Medikament eingenommen?<h4/>",
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
          }
        }
      ]
    });
  };

  //Pop-Up welches anzeigt, wann die Erinnerung wieder erscheinden soll.
  // Wurde zu Testzwecken verwendet. Wird in der aktuellen Version der App nicht verwendet. (Stand 15.1.2016)

  $scope.showLater = function(item) {
    var confirmPopup = $ionicPopup.show({
      template: "<style>.popup { width:700px; text-align:center; }</style><h4>Erinnerung in<h4/>",
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

  // Pop-up welches anzeigt, wenn ein Medikament mittels Klick ausgewählt wird. Das Medikament kann gelöscht werden,
  // oder Informationen des Compendiums werden angezeigt (hier zu Demozwecken funktioniert es nur mit Marcoumar).

  $scope.editMedikament = function(item) {
    var confirmPopup = $ionicPopup.show({
      template: "<style>.popup { width:700px; text-align:center; }</style><h4>Medikament<h4/>",
      scope: $scope,
      buttons: [
        {
          text: 'Bearbeiten',
          type: 'button-assertive',
          onTap: function (item) {
            $scope.deleteMedikament(item);
          }

        }
        ,
        {
          text: 'Medi-Infos',
          type: 'button-calm',
          onTap: function (item) {
            window.open('https://compendium.ch/prod/marcoumar-tabl-3-mg/de', "_self");
          }
        }
      ]
    });
  };

  $scope.deleteMedikament = function(item) {
    var confirmPopup = $ionicPopup.show({
      template: "<style>.popup { width:700px; text-align:center; }</style><h4>Medikament<h4/>",
      scope: $scope,
      buttons: [
        {
          text: 'Löschen',
          type: 'button-assertive',
          onTap: function (item) {
            $scope.removeItem(item);
          }

        }
        ,
        {
          text: 'Abbrechen',
          type: 'button-calm'
        }
      ]
    });
  };

})

//--------------------------------------------------------------------------------------------------//

// Dieser Controller regelt die Funktionen der Medikamentenliste

  .controller('TodoList', ['ListFactory', '$scope', '$ionicModal', '$timeout', '$q', '$ionicPopup', '$cordovaLocalNotification',
    function(ListFactory, $scope, $ionicModal, $timeout, $q, $ionicPopup, $cordovaLocalNotification) {

      // Den add-change Dialog laden

      $ionicModal.fromTemplateUrl('templates/add-change-dialog.html', function(modal) {
        $scope.addDialog = modal;
      }, {
        scope: $scope,
        animation: 'slide-in-up'
      });

      // Dialog zum Hinzufügen eines Medikament anzeigen und Autocomplete der Suchfunktion aufrufen.

      $scope.showAddChangeDialog = function(action) {
        $scope.action = action;
        $scope.addDialog.show();
        $scope.setupAutocomplete();
      };

      // Dialog zum Hinzufügen eines Medikaments schliessen

      $scope.leaveAddChangeDialog = function() {
        // Dialog entfernen
        $scope.addDialog.remove();
        // Modal Template nochmals laden um Formulare zu clearen
        $ionicModal.fromTemplateUrl('templates/add-change-dialog.html', function(modal) {
          $scope.addDialog = modal;
        }, {
          scope: $scope,
          animation: 'slide-in-up'
        });
      };

      // Diverse Funktionen für Buttons zum Löschen (werden in dieser Version der App (Stand 15.1.2016) nicht verwendet).

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

      // Liste vom lokalen Speicher aufrufen
      $scope.list = ListFactory.getList();

      $scope.saveEmpty = function(form) {
        $scope.form = angular.copy(form);
      }

      //---------------------------------------------- Erfassen & Speichern eines Medikaments --------------------------------------

      $scope.addItem = function(form) {
        var newItem = {};

       // Werte vom Formular ("Medikament hinzufügen" des add-change-Dialogs) zu Objekten umwandeln

        // Name des Medikaments mittels Autocomplete-Funktion, oder benutzerdefinierte Eingabe wird in ein neues Objekt umgewandelt.

        newItem.description = form.description.$modelValue ? form.description.$modelValue.title: $('input#description_value').val();

        // Intervall der Medikamenteneinnahme, Erinnerungs- oder Ablaufdatum

        newItem.intervall = $scope.intervall;
        newItem.remind_date = form.remind_date.$viewValue;
        newItem.bedarf = form.bedarf.$modelValue;

        // Condition welche ausgeführt wird, wenn Einnahme bei Bedarf angeklickt wird, kann keine Erinnerungszeit und Erinnerung
        // erfasst werden.

        if (!newItem.bedarf) {
          newItem.remind_time1 = $scope.remind_time1.inputEpochTime;
          newItem.remind_time2 = $scope.remind_time2.inputEpochTime;
          newItem.remind_time3 = $scope.remind_time3.inputEpochTime;
          newItem.remind_time4 = $scope.remind_time4.inputEpochTime;
          newItem.remind_time5 = $scope.remind_time5.inputEpochTime;
          newItem.remind_time6 = $scope.remind_time6.inputEpochTime;
          newItem.pushNotification = form.pushNotification.$modelValue;

          // Ausgabe des Status der Notification mittels Boolean auf der Konsole.

          console.log('Notification is', form.pushNotification.$modelValue);

          // Wenn Erinnerung auf "true" ist wird eine Notification zur Erinnerung der Medikamenteneinnahme getriggert

          if (form.pushNotification.$modelValue == true) {

            console.log('Notification scheduled');

            // Verschiedene Methoden zum Timen von Notifications

            //var alarmTime = new Date(new Date().getTime() + 5 * 1000);     // new Date() = Aktuelles Datum

            //var alarmTime2 = new Date();
            //alarmTime2.setHours(10);
            //alarmTime2.setMinutes(54);
            //alarmTime2.setSeconds(0);

            // Die Zeit, wann die Notification getriggert wird wird vom Zeitselector geholt, wenn der Benutzer
            // eine Erinnerungszeit auswählt. Nur einfache Erinnerungen sind implementiert.

            var alarmTime3 = new Date();
            alarmTime3.setHours($scope.selectedHours);
            alarmTime3.setMinutes($scope.selectedMinutes-1);
            alarmTime3.setSeconds(45);

            // Funktion zu Testzwecken im Browser

            // console.log(form.description.$modelValue.title, 'is scheduled for:', $scope.selectedHours, ':', $scope.selectedMinutes);

            if (window.cordova) {
              $cordovaLocalNotification.add({
                id: "123",
                at: alarmTime3,
                every: "day",

                // Medikamentenname wird in der Benachrichtigung angezeigt.

                title: form.description.$modelValue.title,
                text: "JETZT einnehmen",
                icon: "res://icon",
                smallIcon: "res://icon",
                led: "FF0000"
              }).then(function () {
                console.log("The notification was set");
              },function (e) {
                console.log("notification error: ", e);
              });

            }

            // Condition welche ausgeführt wird, falls die Notification scheduled ist (true/false)
            // Diese kann mittels Button für Alert zu Testzwecken in der App aufgerufen werden. (Funktioniert nicht bei Browser-Tests)

            $scope.isScheduled = function () {

              console.log('Notification should be scheduled');

              $cordovaLocalNotification.isScheduled("123").then(function (isScheduled) {
                alert("Notification 123 scheduled: " + isScheduled);
              });
            };
          }
        }

        // Neue Liste im Scope un der Factory (Interner Speicher) speichern
        $scope.list.push(newItem);
        ListFactory.setList($scope.list);

        // Add-Change-Dialog schliessen
        $scope.leaveAddChangeDialog();
      };

      // Element von der Liste löschen
      $scope.removeItem = function(item) {
        $scope.list.splice($scope.list.indexOf(item), 1);

        // Save list in factory
        ListFactory.setList($scope.list);
      }

      $scope.showEditItem = function(item) {

        // Funktion welche die Bearbeitung eines Elements steuert (wirft Exception, deshalb nicht implementiert)

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

      // Funktionen welche das Ein- und Ausblenden von bestimmten Elementen steuert.

      $scope.peekabooItem = false;

      $scope.hideManual = true;
      $scope.hideManually = true;

      $scope.animate = true;

      //---------------------------------------------- Steuerung Einnahme-Uhrzeit/-en--------------------------------------

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

      // Holen des Input vom Formular und Umwandlung in ein Objekt
      $scope.remind_time1 = createRemindTimeObject('remind_time1');
      $scope.remind_time2 = createRemindTimeObject('remind_time2');
      $scope.remind_time3 = createRemindTimeObject('remind_time3');
      $scope.remind_time4 = createRemindTimeObject('remind_time4');
      $scope.remind_time5 = createRemindTimeObject('remind_time5');
      $scope.remind_time6 = createRemindTimeObject('remind_time6');

      // Funktion zur Ausgabe der erfassten Zeit für Testtwecke
      function timePickerCallback(val, name) {
        if (typeof (val) === 'undefined') {
          console.log('Time not selected');
        } else {
          var selectedTime = new Date(val * 1000);
          $scope[name].inputEpochTime = val;
          console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
          $scope.selectedHours = selectedTime.getUTCHours();
          $scope.selectedMinutes = selectedTime.getUTCMinutes();
          console.log('Hours are: ', $scope.selectedHours, 'Minutes are: ', $scope.selectedMinutes);
        };
      }

      // Hier wird eine Condition ausgeführt, welche die Uhrzeit abhändig von der Auswahl des Intervalls ein-/ausblendet.
      $scope.taegl1 = true;
      $scope.taegl2 = true;
      $scope.taegl3 = true;
      $scope.taegl4 = true;
      $scope.taegl5 = true;
      $scope.taegl6 = true;

      // Inhalt des Intervall-Dropdowns

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

      //---------------------------------------------- Such-Vorschläge--------------------------------------

      // Die folgende Funktion ruft den Array aus medilist.js auf und durchsucht deren Elemente gemäss der Tastatureingabe
      // des Benutzers bei der Erfassung eines Medikaments. (Quelle: Erweiterte Präparateliste - Swissmedic - Stand: 31.10.2015)

      $scope.medilist = _.map(medilist, function (item) {
        return {name: item}
      });
      $scope.setupAutocomplete = function (){

      };
    }
  ])

  //---------------------------------------------- Zeitumrechnung--------------------------------------

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
  })

  //---------------------------------------------- Statistiken --------------------------------------

  // Dougnut Chart für statistik.html -> Tab Heute

    .controller("DoughnutCtrl", function ($scope) {
      $scope.labels = ["Noch einzunehmen", "Eingenommen", "Nicht eingenommen"];

      $scope.doughnutdata = [2, 3, 1]; // Noch einzunehmen (2), Eingenommen (3), Nicht eingenommen (1)

      $scope.colours = ["#e0ebeb", "#70db70", "#ff4d4d"];
    })

    // Radar Chart für statistik.html -> Tab 7 Tage

    .controller("RadarCtrl", function ($scope) {
      $scope.labels =["MO", "DI", "MI", "DO", "FR", "SA", "SO"];
      $scope.series = ['Total Medikamente', 'Eingenommen', 'Nicht eingenommen'];
      $scope.colours = ["#66c2ff", "#70db70", "#ff4d4d"];
      $scope.data = [
        [6, 6, 6, 6, 6, 6, 6], // Total Medikamente
        [5, 4, 4, 3, 5, 6, 6], // Eingenommen
        [1, 2, 2, 3, 1, 0, 0] // Nicht eingenommen
    ];
    })

    // Bar Chart für statistik.html -> Tab 4 Wochen

    .controller("BarCtrl", function ($scope) {
      $scope.labels = ['1', '2', '3', '4'];
      $scope.series = ['Total Medikamente','Eingenommen', 'Nicht eingenommen'];
      $scope.colours = ["#66c2ff", "#70db70", "#ff4d4d"];

      $scope.data = [
        [6, 6, 6, 7],  // Total Medikamente
        [5, 6, 5, 6], // Eingenommen
        [1, 0, 1, 1]  // Nicht eingenommen
      ];
    })

    // Line Chart für statistik.html -> Tab 1 Jahr

    .controller("LineCtrl", function ($scope) {

      $scope.labels = ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sept", "Okt", "Nov", "Dez"];
      $scope.series = ['Total Medikamente','Eingenommen', 'Nicht eingenommen'];
      $scope.colours = ["#66c2ff", "#70db70", "#ff4d4d"];
      $scope.data = [
        [6, 6, 8, 8, 7, 7, 6, 6, 8, 7, 9, 9],  //Total Medikamente
        [5, 4, 7, 6, 7, 6, 6, 5, 6, 7, 7, 8],  // Eingenommen
        [1, 2, 1, 2, 0, 1, 0, 1, 2, 0, 2, 1]  // Nicht eingenommen
      ];
    })

    //---------------------------------------------- In App Browser--------------------------------------

    // Der Controller steuert die Funktionen zum Aufruf von Webseiten (z.B. compendium.ch) über ein
    // Cordova-Plugin

    .controller("InAppBrowser", function ($scope) {

      $scope.openNews = function()
      {
        // Open in app browser
        setTimeout(function(){
          window.open('http://m.welt.de/gesundheit/#/neu','_self');
        }, 4000);
      };

      $scope.openCompendium = function()
      {
        // Open in app browser
        setTimeout(function(){
          window.open('https://compendium.ch','_self');
        }, 4000);
      };

      $scope.openSymptoms = function()
      {
        // Open in app browser
        setTimeout(function(){
          window.open('http://www.pharmawiki.ch/wiki/index.php?wiki=Indikationen','_self');
        }, 4000);
      };

    })

;;



