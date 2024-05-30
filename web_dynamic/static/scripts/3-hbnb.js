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
    $(document).ready(function() {
        $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
            if (data.status === 'OK') {
                $('#api_status').addClass('available');
            } else {
                $('#api_status').removeClass('available');
            }
        });
    });
    
});
