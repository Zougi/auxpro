export default class GoogleMapHelper {

	constructor(element, options) {
		this.map = new google.maps.Map(element, options);
		this.colors = {
			MARKER_COLOR_RED: 'FE7569',
			MARKER_COLOR_GREEN: '28FE38',
			MARKER_COLOR_BLUE: '3552FE'
		}
		this.markers = [];
		this.circles = [];
	}

	resize() {
		google.maps.event.trigger(this.map, 'resize');
	}

	getMarkerImage(args) {
		return new google.maps.MarkerImage(
			args.icon || 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + (args.color || this.colors.MARKER_COLOR_RED),
			new google.maps.Size(21, 34),
			new google.maps.Point(0, 0),
			new google.maps.Point(10, 34)
		);
	}

	setCenter(location) {
		this.map.setCenter(location);
	}
	
	reverseGeoCodeResult(result, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			this.refs.autocomplete.value = result[0].formatted_address;
		} else {
			alert('ReverseGeoCode Error: ' + status);
		}
	}
	

	// MARKERS //
	// -------------------------------------------------------------------------

	addMarkerIfNoExist(marker) {
		var found = false;
		let l = this.markers.length;
		for (let i = 0; i < l; i++) {
			if (this.markers[i].longitude == marker.longitude && this.markers[i].lattitude == marker.lattitude) {
				found = true;
				break;
			}
		}
		if (!found)
			this.addMarker(marker)
	}
	
	addMarker(marker) {		
		let googleMarker = new google.maps.Marker({
			position: new google.maps.LatLng(marker.lattitude, marker.longitude), 
			map: this.map,
			title: marker.title,
			icon: this.getMarkerImage(marker),
			shadow: marker.shadow
		});
		if (marker.infowindow) {
			let infowindow = new google.maps.InfoWindow({
			    content: marker.infowindow
			});
			infowindow.open(this.map, googleMarker);
		}
		
		if (marker.onClick) {
			google.maps.event.addListener(googleMarker , 'click', function() {
				marker.onClick(marker);
			});
		}
		
		marker.googleMarker = googleMarker;
		this.markers.push(marker);
	}

	updateMarkers(markers) {
		let l = markers.length;
		for (let i = 0; i < l; i++) {
			this.addMarkerIfNoExist(markers[i]);
		}
		this.deleteMarkersFromNewList(markers);
		
	}
	
	deleteMarker(marker) {
		if (marker.googleMarker) {
			marker.googleMarker.setMap(null);
		}
		this.markers.splice(this.markers.indexOf(marker), 1);
	}
	
	deleteMarkersFromNewList(markers) {
		let l = markers.length;
		for (let i = 0; i < this.markers.length; i++) {
			var found = false;
			for (let j = 0; j < l; j++) {
				if (this.markers[i].longitude == markers[j].longitude && this.markers[i].lattitude == markers[j].lattitude) {
					found = true;
					break;
				}
			}
			if (!found) {
				this.deleteMarker(this.markers[i]);
				i--;
			}
		}
	}
	
	cleanMarkers() {
		let l = this.markers.length;
		for (let i = 0; i < l; i++) {
			this.deleteMarker(this.markers[i]);
		}
		this.markers = [];
	}
	

	// CIRCLES //
	// -------------------------------------------------------------------------

	cleanCircles() {
		let l = (this.circles || []).length;
		for (let i = 0; i < l; i++) {
			this.deleteCircle(this.circles[i]);
		}
		this.circles = [];
	}

	addCircleIfNoExist(circle) {
		var found = false;
		let l = (this.circles || []).length;
		for (let i = 0; i < l; i++) {
			if (this.circles[i].longitude == circle.longitude && this.circles[i].lattitude == circle.lattitude && this.circles[i].radius == circle.radius) {
				found = true;
				break;
			}
		}
		if (!found)
			this.addCircle(circle)
	}
	
	addCircle(circle) {
		let googleCircle = new google.maps.Circle({
			strokeColor: circle.strokeColor || '#FF0000',
			strokeOpacity: circle.strokeOpacity || 0.8,
			strokeWeight: circle.strokeWeight || 2,
			fillColor: circle.fillColor || '#FF0000',
			fillOpacity: circle.fillOpacity || 0.35,
			map: this.map,
			center: new google.maps.LatLng(circle.lattitude, circle.longitude),
			radius: circle.radius
		});
		circle.googleCircle = googleCircle;
		this.circles.push(circle);
	}
	
	updateCircles(circles) {
		let l = (circles || []).length;
		for (let i = 0; i < l; i++) {
			this.addCircleIfNoExist(circles[i]);
		}
		this.deleteCirclesFromNewList(circles);
		
	}
	
	deleteCirclesFromNewList(circles) {
		let l = (circles || []).length;
		for (let i = 0; i < this.circles.length; i++) {
			var found = false;
			for (let j = 0; j < l; j++) {
				if (this.circles[i].longitude == circles[j].longitude && this.circles[i].lattitude == circles[j].lattitude && this.circles[i].radius == circles[j].radius) {
					found = true;
					break;
				}
			}
			if (!found) {
				this.deleteCircle(this.circles[i]);
				i--;
			}
		}
	}
	
	deleteCircle(circle) {
		if (circle.googleCircle) {
			circle.googleCircle.setMap(null);
		}
		this.circles.splice(this.circles.indexOf(circle), 1);
	}
}
