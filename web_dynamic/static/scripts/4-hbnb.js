$(document).ready(function () {
    const selectedAmenities = {};

    $('input[type="checkbox"]').change(function () {
        if (this.checked) {
            selectedAmenities[$(this).data('id')] = $(this).data('name');
        } else {
            delete selectedAmenities[$(this).data('id')];
        }
        const amenitiesList = Object.values(selectedAmenities).join(', ');
        $('.amenities h4').text(amenitiesList);
    });

    // Request API status
    $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });

    // Request for places
    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (data) {
            for (let place of data) {
                $('.places').append(
                    '<article>' +
                    '<div class="title">' +
                    '<h2>' + place.name + '</h2>' +
                    '</div>' +
                    '<div class="information">' +
                    '<div class="price_by_night">' + place.price_by_night + '</div>' +
                    '<div class="max_guest">' + place.max_guest + ' Guests</div>' +
                    '<div class="number_rooms">' + place.number_rooms + ' Bedrooms</div>' +
                    '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathrooms</div>' +
                    '</div>' +
                    '<div class="description">' + place.description + '</div>' +
                    '</article>'
                );
            }
        }
    });

    // Fetch places on button click with selected amenities
    $('button').click(function () {
        const amenities = Object.keys(selectedAmenities);
        fetchPlaces({ amenities: amenities });
    });
});
