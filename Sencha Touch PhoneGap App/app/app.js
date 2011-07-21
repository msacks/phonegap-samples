Ext.regApplication({
    name: 'myApp',
    launch: function() {
		this.launched = true;
		this.appReady();
    },
	
	
	appReady: function(){
		if(!device || !this.launched){ return; }
		
		this.lat = 0;
		this.lng = 0;
		this.center=0;
		var self = this;
		var locationSuccess = function(position){
			self.lat = position.coords.latitude;
			self.lng = position.coords.longitude;
			self.center = new google.maps.LatLng(self.lat, self.lng);
			refresh();
		}
		
		var locationError = function(){
			console.log("Can't get location!");
			self.lat = 37.423021;
			self.lng = -122.08373;
			self.center = new google.maps.LatLng(self.lat, self.lng);
			refresh();
		}
		
		navigator.geolocation.getCurrentPosition(locationSuccess,locationError);
		
		var tweetPanel = new Ext.Component({
			title: 'Tweets',
			cls: 'tweetPanel',
			scroll: 'vertical',
			tpl: [
				'<tpl for=".">',
					'<div class="tweet">',
							'<div class="avatar"><img src="{profile_image_url}" /></div>',
							'<div class="tweetContent">',
								'<h1>{from_user}</h1>',
								'<p>{text}</p>',
							'</div>',
					'</div>',
				'</tpl>'
			]
		});
		
		refresh = function(){
			Ext.util.JSONP.request({
				url: 'http://search.twitter.com/search.json',
				callbackKey: 'callback',
				params: {
					geocode: self.lat + ',' + self.lng + ',' + '5mi',
					rpp: 15
				},
				callback: function(data) {
					var theResults = data.results;
					tweetPanel.update(theResults);	
					
					for (var i = 0, ln = theResults.length; i < ln; i++) {
						var tweet = theResults[i];
						if (tweet.geo && tweet.geo.coordinates) {
							addMarker(tweet);
						}
					}
				}
			});
			mapPanel.update(self.center);
		}

		var mapPanel = new Ext.Map({
			title: 'My Map',
			center: self.center,
			mapOptions: {
				zoom: 12
			}
		});
		
		var panel = new Ext.TabPanel({
			fullscreen: true,
			cardSwitchAnimation: 'slide',
			ui: 'light',
			items: [tweetPanel,mapPanel]
		});
		
		panel.getTabBar().add([
			{
				xtype: 'button',
				iconMask: true,
				iconCls: 'refresh',
				ui: 'plain',
				style: 'margin:0;',
				handler: refresh
			}
		]);
		
		panel.getTabBar().doLayout();
		
		addMarker = function(tweet) {
			var latLng = new google.maps.LatLng(tweet.geo.coordinates[0], tweet.geo.coordinates[1]);

			var marker = new google.maps.Marker({
				map: mapPanel.map,
				position: latLng
			});

			google.maps.event.addListener(marker, "mousedown", function() {
				tweetBubble.setContent(tweet.text);
				tweetBubble.open(mapPanel.map, marker);
			});
		};

		tweetBubble = new google.maps.InfoWindow();

	}
});
