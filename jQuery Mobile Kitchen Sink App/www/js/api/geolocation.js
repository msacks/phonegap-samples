(function() {

    $('#geolocation').bind('pageshow', function() {
        // Fullscreen map
        var height = $('#geolocation').height() - $('#geolocation div[data-role="header"]').height(); 
        var width  = $('#geolocation').width();
        $('#map_canvas').css({
            'height': height + 'px',
            'width':  width  + 'px'
        });

        var onSuccess = function(position) {
            console.log(position);
            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var map = new google.maps.Map(document.getElementById("map_canvas"), {
                zoom: 12,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title: "You"
            });
        };

        var onFail = function() {
            console.log('Failed to get geolocation');
        };

        navigator.geolocation.getCurrentPosition(onSuccess, onFail);
    });

})();
