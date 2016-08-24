// Declaration of Restaurants
var locations = [
	{
		name: 'Blue Nile Ethiopian Restaurant',
		phone: '(403) 270-4550',
		address: '322 10 St NW',
		city: 'Calgary, AB, T2N 1V8',
		website: 'http://www.blue-nile-calgary.com',
		facebook: 'https://www.facebook.com/Blue-Nile-Ethiopian-Restaurant-137520976260894/',
		latlng: { lat: 51.054907, lng: -114.0859366 },
		filtered: ko.observable(true)
	},
	{
		name: 'Delicious Thai Restaurant',
		phone: '(403) 450-1996',
		address: '314 10 St NW',
		city: 'Calgary, AB, T2N 1V8',
		website: 'http://www.delicious-thai.com',
		facebook: 'https://www.facebook.com/Deliciousthaicalgary/?fref=ts',
		latlng: { lat: 51.0545118, lng: -114.0855684 },
		filtered: ko.observable(true)
	},
	{
		name: 'Bodega',
		phone: '(403) 475-9227',
		address: '318A 10 St NW',
		city: 'Calgary, AB, T2N 1V8',
		website: 'http://www.labodega.ca',
		faecbook: 'https://www.facebook.com/bodegacalgary/?fref=ts',
		latlng: { lat: 51.054815, lng: -114.085526 },
		filtered: ko.observable(true)
	},
	{
		name: 'Midtown Kitchen & Bar',
		phone: '(403) 474-2555',
		address: '302 10 St NW',
		city: 'Calgary, AB, T2N 1V8',
		website: 'http://www.midtownkitchen.ca',
		facebook: 'https://www.facebook.com/MidtownKitchenBar/?fref=ts',
		latlng: { lat: 51.0541687, lng: -114.0857281 },
		filtered: ko.observable(true)
	},
	{
		name: 'Shawarma Station',
		phone: '(403) 283-0606',
		address: '106-227 10 St NW',
		city: 'Calgary, AB, T2N 1V8',
		website: 'http://www.shawarmastationcalgary.com',
		facebook: 'https://www.facebook.com/Shawarma-Station-657998680915701/?fref=ts',
		latlng: { lat: 51.0537143, lng: -114.0863066 },
		filtered: ko.observable(true)
	}
];

// Global functions
var map;
var markers;
var infoWindow;

// Google Map Initialization
function initMap() {
   	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 51.0545169, lng: -114.0860707 },
		zoom: 17
	});

	ko.applyBindings(ViewModel());
}

// Knockout ViewModel
function ViewModel() {
	var self = this;
	infoWindow = new google.maps.InfoWindow();
	self.sortedlocations = ko.observableArray(locations);

	// Create markers and add infowindow functionality
	self.sortedlocations().forEach(function(location) {
		var position = location.latlng;
		var title = location.name;
		marker = new google.maps.Marker({
			map: map,
			position: position,
			title: title,
			animation: google.maps.Animation.DROP
		});

		location.marker = marker;

		marker.addListener('click', function() {
			toggleAnimation(location.marker);
			populateInfoWindow(location);
		});
	});
	self.searchName = ko.observable('');

	// Changes the searchName observable (input into textbox) to lowercase, searches against lowercase names in sortedlocations()
	// Changes filtered value to false if no match & true if there is a match
	// Changes results that are filtered out to have a 'null' map.
	self.lowerCaseSearch = ko.computed(function() {
		var query = searchName().toLowerCase();
		for (var i = 0; i < sortedlocations().length; i++) {
			var locationname = sortedlocations()[i].name.toLowerCase();
			// Checks to see if the entered text is visible in any restaurant name in array
			if (locationname.indexOf(query) === -1) {
				// Change filtered value to false when no match
				sortedlocations()[i].filtered(false);
				sortedlocations()[i].marker.setVisible(false);
				infoWindow.close();
			} else {
				// Change filtered value to true with a match
				sortedlocations()[i].filtered(true);
				sortedlocations()[i].marker.setVisible(true);
			}
		}
	});

	// Handles bouncing animation on opening of infowindow
	self.toggleAnimation = function(location) {
		location.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function(){
			location.setAnimation(null);
		}, 1400);
	};

	// Click handler for sidebar list -- Treats click of list as a click of the marker
	self.listClick = function(location) {
		google.maps.event.trigger(location.marker, 'click');
	};

	// Expands/Contracts list on mobile displays/small browswer windows
	self.toggleMenu = function() {
		if ($('#sidebar').css('display') == 'none') {
			$('#sidebar').css('display', 'block');
		} else {
			$('#sidebar').css('display', 'none');
		}
	};

	// Populates infoWindow with info from sortedlocations KO observable and Yelp API
	self.populateInfoWindow = function(location) {
		// Code exerpt from https://www.thepolyglotdeveloper.com/2015/03/create-a-random-nonce-string-using-javascript/
		var randomString = function() {
			var length = 10;
    		var text = "";
    		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    		for(var i = 0; i < length; i++) {
	        	text += possible.charAt(Math.floor(Math.random() * possible.length));
    		}
    		return text;
		};

		// Parameters to feed into Yelp AJAX request
		var parameters = {
			oauth_consumer_key: 'Xy_-i8Qhfgn82jMEtAfA_g', // Yelp API generated consumer key
			oauth_token: 'JG74BPBt9bldwbmByB9QE2ueGYVGny7A', // Yelp API generated token
			oauth_signature_method: 'HMAC-SHA1', // oauth signature method
			oauth_timestamp: Math.floor(Date.now() / 1000), // Number of seconds since January 1, 1970 00:00:00 GMT
			oauth_nonce: randomString(), // A random string, uniquely generated for each request.
			limit: 1,
			callback: 'cb',
		};

		// Variables specific to Yelp AJAX Request
		var consumerSecret = 'wrJfUZKAqSavqVHXsWm1jRpWEME';
		var tokenSecret = '4wZwbaJlyls7bQjxgDD5UT8ybYw';
		// Yelp Phone Search URL for AJAX Request
		var yelpURL = 'http://api.yelp.com/v2/phone_search';
		// Pulls phone number from sortedlocations KO observable and adds it to parameters supplied to Yelp AJAX request
		var phone = location.phone;
		parameters.phone = phone;

		// Using format oauthSignature.generate(method, URL, parameters, CONSUMER_SECRET, TOKEN_SECRET)
		var encodedSignature = oauthSignature.generate('GET', yelpURL, parameters, consumerSecret, tokenSecret);
		parameters.oauth_signature = encodedSignature;

		// AJAX request
		var request = $.ajax({
			url: yelpURL,
			data: parameters,
			cache: true,
			dataType: 'jsonp',
			jsonpCallback: 'cb',
		});

		request.done(function(data) {
				infoWindow.setContent('<div><a href="' + location.website + '" target="_blank">' + location.name + '</a><br/>' + location.phone + '<br/>' + location.address + ', ' + location.city + '</div> <div><a href="' + data.businesses[0].url + 'target="_blank""><img src="' + data.businesses[0].rating_img_url + '" alt="Yelp Rating"><img src="https://s3-media2.fl.yelpcdn.com/assets/srv0/developer_pages/5cb298e8a186/assets/img/yelp-logo-xsmall@2x.png" alt="Yelp!"></a></div><div>' + data.businesses[0].snippet_text + '</div>');
				infoWindow.open(map, location.marker);
			});

		request.fail(function(data) {
				infoWindow.setContent('<div><a href="' + location.website + '" target="_blank">' + location.name + '</a><br/>' + location.phone + '<br/>' + location.address + ', ' + location.city + '</div><div>Yelp info could not be accessed at this time, please try again later</div>');
				infoWindow.open(map, location.marker);
			});

		return location.marker;
	};
}

// onerror function in case of Google Map not loading properly
function mapError() {
	document.getElementById('map').innerHTML = "<p>We're sorry, the map could not be loaded at this time.</p>";
}

/* TODO for future updates after Nanodegree completed:
	- Add additional restaurant locations
	- Include FB link in infowindow
	- Update map zooming and center on infoWindow open/close
	- Include additional types of filtering (dropdown menu for cuisine, etc)
	- Animate menu when hamburger button pressed
	- Implement OOP for restaurant locations for ease of adding more & better architecture overall
	- Use KO with click & css bindings to toggle class to open/close hamburger menu
*/