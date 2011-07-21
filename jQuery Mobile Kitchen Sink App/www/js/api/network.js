(function() {

    $('#network').bind('pageshow', function() {
        navigator.network.isReachable('phonegap.com', function(reachability) {
            // There is no consistency on the format of reachability
            var networkState = reachability.code || reachability;

            var states = {};
            states[NetworkStatus.NOT_REACHABLE]                      = 'No network connection';
            states[NetworkStatus.REACHABLE_VIA_CARRIER_DATA_NETWORK] = 'Carrier data connection';
            states[NetworkStatus.REACHABLE_VIA_WIFI_NETWORK]         = 'WiFi connection';

            $('#network ul[data-role="listview"] p').html(states[networkState]);
        });
    });

})();
