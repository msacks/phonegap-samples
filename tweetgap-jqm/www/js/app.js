// jQuery Mobile initalization event.
//
// Since we do not use PhoneGap immediately, we do not worry about
// the `deviceready` event.
//
$(document).bind("mobileinit", function() {
    // Constant URLs
    var URL = {
        search: 'http://search.twitter.com/search.json?q={{QUERY}}'
    };

    // Helper function to check network status before sending ajax requests
    var ajax = function(options) {
        navigator.network.isReachable('phonegap.com', function(reachability) {
            var networkState = reachability.code || reachability;

            if (networkState === NetworkStatus.NOT_REACHABLE) {
                navigator.notification.alert('Sorry, you are currently offline.');
                options.error();
            }
            else {
                $.ajax(options);
            }
        });
    };

    // Search Page logic
    //
    // If the query string is blank, then set the query to
    // undefined. This will allow the tweets page to choose
    // a good default query.
    //
    // We must save the query so that the tweets page can access it.
    // We could use a global-ish JavaScript variable, but
    // jQuery Mobile provides some nice data functions.
    //
    $('#search-page form').live('submit', function(e) {
        var query = $.trim($('#search').attr('value'));
        query = (query === '') ? undefined : query;

        $.jqmData(document.body, 'query', query);
    });

    // Tweets Page logic
    //
    // Send a XHR (ajax) request to Twitter and render the
    // resulting tweets into the list.
    //
    $('#tweets-page').live('pagecreate', function(e, ui) {
        // Show the loading dialog
        $.mobile.pageLoading();

        // Get the query. If the query is undefined, then use 'PhoneGap' as the
        // default query value. This is helpful if the tweets page is loaded 
        // directly, instead of being called by the search page.
        var query = $.jqmData(document.body, 'query') || 'PhoneGap';

        ajax({
            url: URL.search.replace('{{QUERY}}', query),

            dataType: 'json',

            success: function(data) {
                var html      = $('#tweets-header-template').html().replace('{{QUERY}}', query);
                var tweetHTML = $('#tweets-item-template').html();
                var results   = data.results;

                for(var i = 0, l = results.length; i < l; i++) {
                    var item = results[i];
                    html += tweetHTML.replace('{{IMAGE}}',  item.profile_image_url)
                                     .replace('{{USER}}',   '@' + item.from_user)
                                     .replace('{{TEXT}}',   item.text);
                }

                // innerHTML dump the tweets <li>'s into the list.
                // We must then tell jQuery Mobile to re-render (refresh) the list.
                $('#tweets-page ul').html(html).listview('refresh');

                // Hide the loading dialog
                $.mobile.pageLoading(true);
            },

            error: function() {
                $('#tweets-page ul li:first').text('Search failed because you are offline.')
            }
        });
    });
});