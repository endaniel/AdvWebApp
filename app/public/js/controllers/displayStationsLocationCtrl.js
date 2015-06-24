(function(){
    "use strict";
    function displayStationsLocationCtrl($scope, stationService){
            var self = this;
            var mapOptions = {
                zoom: 6,
                center: new google.maps.LatLng(33,35),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            $scope.markers = [];
            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

            var infoWindow = new google.maps.InfoWindow();
            var geocoder = new google.maps.Geocoder();

            self.getCoords = function(address, callback) {
                var coordinates;
                geocoder.geocode( { address: address}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        coordinates = [results[0].geometry.location.lat(), results[0].geometry.location.lng()];
                        callback(coordinates);
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            }

            self.createMarker = function (info){
                self.getCoords(info.address, function(coords){
                    var marker = new google.maps.Marker({
                        map: $scope.map,
                        position: new google.maps.LatLng(coords[0], coords[1]),
                        title: info.address
                    });
                    marker.content = '<div class="infoWindowContent">' + info.id + '</div>';

                    google.maps.event.addListener(marker, 'click', function(){
                        infoWindow.setContent('<h2>' + marker.title + '</h2>' +
                        marker.content);
                        infoWindow.open($scope.map, marker);
                    });

                    $scope.markers.push(marker);
                })
            }

            stationService.getAll()
                .then(function (displayStations) {
                    _.forEach(displayStations.data, function (displayStation) {
                        self.createMarker (displayStation);

                    })
                })

            $scope.openInfoWindow = function(e, selectedMarker){
                e.preventDefault();
                google.maps.event.trigger(selectedMarker, 'click');
            }
        }
    angular.module('app').controller('displayStationsLocationCtrl', ['$scope', 'stationService', displayStationsLocationCtrl])
})();