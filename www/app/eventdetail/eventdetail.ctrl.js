'use strict';
angular.module('app')
  .controller('EventdetailCtrl', function($rootScope, $scope, $ionicHistory, $stateParams, $ionicLoading, $compile, $window){
    function initialize() {
        console.log("jey");
        var myLatlng = new google.maps.LatLng(43.07493, -89.381388);


        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);

        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
            content: compiled[0]
        });

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map, marker);
        });

        $scope.map = map;
    }

    google.maps.event.addDomListener(window, 'click', initialize);

        $scope.centerOnMe = function() {
            if (!$scope.map) {
            return;
        }

        $scope.loading = $ionicLoading.show({
            content: 'Getting current location...',
            showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
            $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            $scope.loading.hide();
        }, function(error) {
            alert('Unable to get location: ' + error.message);
        });
    };

    $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
    };







    var data = {}, fn = {};
    var weekday = new Array(7);
    weekday[0]=  "Sonntag";
    weekday[1] = "Montag";
    weekday[2] = "Dienstag";
    weekday[3] = "Mittwoch";
    weekday[4] = "Donnerstag";
    weekday[5] = "Freitag";
    weekday[6] = "Samstag";

    $scope.data = data;
    $scope.fn = fn;

    var reqData = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        data.event = JSON.parse(this.responseText);
        var date = new Date(data.event.date);
        data.event['daystring'] = weekday[date.getDay()] + ", " + ("0" + date.getHours()).slice(-2) + "." + ("0" + date.getMinutes()).slice(-2);
        data.event.categories = $rootScope.categories[data.event.category];
      }
    });

    xhr.open("GET", "http://localhost:3000/api/events/" + $stateParams.id + "?access_token=" + $window.localStorage['access_token']);
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "7e6e29fe-c29c-2779-cd9f-996579bf5a3f");

    xhr.send(reqData);

    var reqData2 = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        data.users = [];
        data.users = JSON.parse(this.responseText);
        data.remainingSpaces = data.event.maxParticipants - data.users.length;
      }
    });

    xhr.open("GET", "http://localhost:3000/api/events/" + $stateParams.id + "/accounts?access_token=" + $window.localStorage['access_token']);
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "12b81b8f-93c1-7752-d2ac-823e5743d6a0");

    xhr.send(reqData2);

    var reqData3 = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        data.participates = JSON.parse(this.responseText).participates;
      }
    });

    xhr.open("GET", "http://localhost:3000/api/participants/participates?accountId=" + $window.localStorage['user_id'] + "&eventId=" + $stateParams.id + "&access_token=" + $window.localStorage['access_token']);
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "e5c9e6c6-e44e-fdfd-c819-c833ee6d60d8");

    xhr.send(reqData3);

    fn.myGoBack = function() {
      $ionicHistory.goBack();
    };
  });