# Google Map API Project
This project is a part of the [Udacity](http://www.udacity.com) Front End Web Developer Nanodegree, used to advance Javascript knowledge through the use of third party APIs, AJAX reqeust, and building from scratch

## Installation
Download and unzip into folder of your choice, open index.html to open the webpage.

## Background Information
This website generates a google map based on a set of locations, creating markers for each location.  [BootstrapJS](http://www.getbootstrap.com) is used for the framework of the page.  [KnockoutJS](http://www.knockoutjs.com)'s ViewModel is used to populate information viewed by the user, including the sidebar list of locations, filtering of that sidebar through the use of text input, and opening of google infoWindows.

On clicking of a Google Maps marker or a location in the sidebar list, a Google Maps infowindow will open.  Static information within the infowindow is displayed from the KnockoutJS observable array.  [Yelp's](https://www.yelp.com/developers) third party API is accessed to display the Yelp star rating and a portion of a recent review of the location.

## Reccomended Usage
On opening of index.html, click markers and/or list locations.  Follow links within the infowindows to the location website (by clicking its name within the infoWindow) and/or the business' Yelp page (by clicking on the yelp star rating or yelp logo).  Filter the markers listed and names listed in the sidebar by entering some text into the input field.


## Credits
* David Kohlruss - Updated materials and modifications
* [Udacity](http://www.udacity.com) - Source materials
* [Mozilla](http://developer.mozilla.org) - Math operations for randomization and collision detection