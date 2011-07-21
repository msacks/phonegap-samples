// Define navigator namespace
if (typeof window.navigator === 'undefined') window.navigator = {};

// Stub Network API
window.navigator.network = {
    isReachable: function(domain, callback) {
        // online
        callback({ code: NetworkStatus.REACHABLE_VIA_WIFI_NETWORK });

        // offline
        // callback({ code: NetworkStatus.NOT_REACHABLE });
    }
};

window.NetworkStatus = {
    NOT_REACHABLE: '0',
    REACHABLE_VIA_CARRIER_DATA_NETWORK: '1',
    REACHABLE_VIA_WIFI_NETWORK: '2'
};

// Stub Notification Alert API
window.navigator.notification = {
    alert: function(message) {
        alert(message);
    }
};