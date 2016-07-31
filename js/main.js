// TODO: Populate infowindow with useful info
// TODO: Review rubric and see what exactly I need to do before going further
// TODO: Grab FB & 4Square info for infowindow

var locations = [
	{
		name: 'Blue Nile Ethiopian Restaurant',
		ID: '1',
		phone: '(403) 270-4550',
		address: '322 10 St NW',
		city: 'Calgary, AB, T2N 1V8',
		website: 'http://www.blue-nile-calgary.com',
		facebook: 'https://www.facebook.com/Blue-Nile-Ethiopian-Restaurant-137520976260894/',
		foursquare: 'https://foursquare.com/v/blue-nile/4b0586ebf964a520787522e3',
		latlng: { lat: 51.054907, lng: -114.0859366 }
	},
	{
		name: 'Delicious Thai Restaurant',
		ID: '2',
		phone: '(403) 450-1996',
		address: '314 10 St NW',
		city: 'Calgary, AB, T2N 1V8',
		website: 'http://www.delicious-thai.com',
		facebook: 'https://www.facebook.com/Deliciousthaicalgary/?fref=ts',
		foursquare: 'https://foursquare.com/v/delicious-thai/4bff20fec30a2d7f8b96101d',
		latlng: { lat: 51.0545118, lng: -114.0855684 }
	},
	{
		name: 'Bodega',
		ID: '3',
		phone: '(403) 475-9227',
		address: '318A 10 St NW',
		city: 'Calgary, AB, T2N 1V8',
		website: 'http://www.labodega.ca',
		faecbook: 'https://www.facebook.com/bodegacalgary/?fref=ts',
		foursquare: 'https://foursquare.com/v/bodega',
		latlng: { lat: 51.054815, lng: -114.085526 }
	},
	{
		name: 'Midtown Kitchen & Bar',
		ID: '4',
		phone: '(403) 474-2555',
		address: '302 10 St NW',
		city: 'Calgary, AB, T2N 1V8',
		website: 'http://www.midtownkitchen.ca',
		facebook: 'https://www.facebook.com/MidtownKitchenBar/?fref=ts',
		foursquare: 'https://foursquare.com/midtownyyc',
		latlng: { lat: 51.0541687, lng: -114.0857281 }
	},
	{
		name: 'Shawarma Station',
		ID: '5',
		phone: '(403) 283-0606',
		address: '106-227 10 St NW',
		city: 'Calgary, AB, T2N 1V8',
		website: 'http://www.shawarmastationcalgary.com',
		facebook: 'https://www.facebook.com/Shawarma-Station-657998680915701/?fref=ts',
		foursquare: 'https://foursquare.com/v/shawarma-station/4b0586ecf964a520b57522e3',
		latlng: { lat: 51.0537143, lng: -114.0863066 }
	}
];

var map;
var markers;
var infoWindow;

function initMap() {
   	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 51.0545169, lng: -114.0867707 },
		zoom: 16
	});

	ko.applyBindings(ViewModel());
}

function ViewModel() {
	var self = this;
	infoWindow = new google.maps.InfoWindow();

	self.sortedlocations = ko.observableArray(locations);
	console.log('test');

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
			infoWindow.setContent('<div>' + location.name + '</div>');
			infoWindow.open(map, location.marker);
		});
	});
}

function populateInfoWindow(location) {
	return location.marker;
}