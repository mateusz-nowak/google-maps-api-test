$(function() {
    var directionsService = new google.maps.DirectionsService();

    var calcRoute = function(cityA, cityB, cb) {
        var request = {
            origin: cityA,
            destination: cityB,
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, cb);
    }

    $('.btn-compute').on('click', function(e) {
        if ($('#address-first').val().length == 0 || $('#address-secound').val().length == 0) {
            return false;
        }

        var cityA = $('#address-first').val();
        var cityB = $('#address-secound').val();

        calcRoute(cityA, cityB, function(response) {
            var distance = response.routes[0].legs[0].distance;
            var template = _.template($('#template-processed-distance').html(), {
                cityA: cityA,
                cityB: cityB,
                distance: distance.text
            });

            $('#processed-data').html(template);
        });

        e.preventDefault();
        e.stopPropagation();
    });

    var completeCityA = document.getElementById('address-first');
    var completeCityB = document.getElementById('address-secound');

    /**
     * Initialize searches.
     */
    new google.maps.places.Autocomplete(completeCityA, { types: ['geocode'] });
    new google.maps.places.Autocomplete(completeCityB, { types: ['geocode'] });
});