  angular.module('shirtApp', ['ngStorage', 'xeditable']).controller('ShirtCtrl',function($scope,$localStorage) {
    $scope.$storage = $localStorage.$default({
      shirts: []
    });

    $scope.studies = [
      "GEO",
      "GI",
      "LÖK"
    ];

    $scope.gender = [
      "Herren",
      "Damen"
    ];

    $scope.sizes = [
      "XXL",
      "XL",
      "L",
      "M",
      "S"
    ];

    $scope.colors = [
      "Black",
      "White",
      "Natural",
      "Navy",
      "RiverBlue",
      "Chocolate",
      "Red",
      "CityGreen"
    ];

    $scope.prints = [
      "Weiß",
      "NeonGrün",
      "Rot",
      "NeonPink",
      "Blau",
      "Hellblau",
      "NeonGelb",
      "Gelb",
      "Beige",
      "Schwarz",
      "Kackbraun",
      "Orange",
      "NeonOrange",
      "Lila",
      "Türkis",
      "Grün"
    ];

    $scope.master = {
      shirtName:        '',
      shirtEmail:       '',
      shirtAnzahl:      1,
      shirtStudiengang: '',
      shirtGeschlecht:  '',
      shirtGroesse:     '',
      shirtFarbe:       '',
      shirtAufdruck:    ''
    };

    $scope.deleteShirts = function() {
      if (window.confirm("Wirklich alle Shirts löschen?")) {
        delete $localStorage.shirts;
      }
    };

    $scope.deleteShirt = function(shirt) {
      if (window.confirm("Wirklich dieses Shirt löschen?")) {
        if ($scope.$storage.shirts.indexOf(shirt) != -1) {
          $scope.$storage.shirts.splice($scope.$storage.shirts.indexOf(shirt), 1);
        }
      }
    };

    $scope.femaleSelected = function() {
      return ($scope.shirt.shirtGeschlecht === 'Damen' ? true : false);
    };

    $scope.bigN = function(what) {
      return (what.indexOf("Neon") != -1 ? "N" : "");
    };

    $scope.addShirt = function() {
      $scope.$storage.shirts.push({
        name:         $scope.shirt.shirtName,
        email:        $scope.shirt.shirtEmail,
        anzahl:       $scope.shirt.shirtAnzahl,
        studiengang:  $scope.shirt.shirtStudiengang,
        geschlecht:   $scope.shirt.shirtGeschlecht,
        groesse:      $scope.shirt.shirtGroesse,
        farbe:        $scope.shirt.shirtFarbe,
        aufdruck:     $scope.shirt.shirtAufdruck
      });
      $scope.reset();
    };

    $scope.reset = function() {
      $scope.shirt = angular.copy($scope.master);
    };

    $scope.isUnchanged = function(shirt) {
      return angular.equals(shirt, $scope.master);
    };

    $scope.download = function() {
      var jsonexport = [];
      angular.copy($scope.$storage.shirts, jsonexport);
      var csv = json2csv(jsonexport.sort(function(a,b) { return (a.studiengang > b.studiengang ? 1 : -1) }));
      window.open("data:text/csv;charset=utf-8," + escape(csv), 'shirts.csv');
    };

    $scope.reset();
  });
  window.onbeforeunload = function() {
   //return false;
  };
