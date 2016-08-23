export default class GoogleMapHelper {

	const MARKER_COLOR_RED = 'FE7569';
	const MARKER_COLOR_GREEN = '28FE38';
	const MARKER_COLOR_BLUE = '3552FE';

	constructor(element, options) {
		this.map = new google.maps.Map(element, options);
	}

	resize() {
		let c = this.map.getCenter();
 		google.maps.event.trigger(this.map, 'resize');
 		this.map.setCenter(c);
	}

	getMarkerImage(color) {
		return new google.maps.MarkerImage(
        	new google.maps.Size(21, 34),
    		"http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + (color || MARKER_COLOR_RED),
        	new google.maps.Point(0,0),
        	new google.maps.Point(10, 34)
        );
	}

	addMarker(args) {
		return new google.maps.Marker({
			position: args.position,
			map: this.map,
			title: args.title,
			icon: args.icon,
			shadow: args.shadow
		});
	}

	deleteMarker(marker) {
		if (marker) {
			marker.setMap(null);
		}
	}

	refreshMarker(marker, location, title) {
		this.deleteMarker(marker);
		return this.addMarker(location, title);
	}
	
	addCircle(position, radius) {
		return new google.maps.Circle({
			strokeColor: '#FF0000',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: '#FF0000',
			fillOpacity: 0.35,
			map: this.map,
			center: position,
			radius: radius
		});
	}
	
	deleteCircle(circle) {
		if (circle != null) {
			circle.setMap(null);
		}
	}
	
	refreshCircle(circle, position, radius) {
		this.deleteCircle(circle);
		return this.addCircle(position, radius);
	}
	
	refreshMyCircle() {
		this.myCircle = this.refreshCircle(this.myCircle, this.circleMarker.position, parseInt(this.refs.radius.value));
	}
  
  	setCenter(location) {
  		this.deleteMarker(this.centerMarker);
  		this.centerMarker = this.addMarker(location, 'center');
  		this.map.setCenter(location);
	}
  
	autocompleteChange() {
		var place = this.autocomplete.getPlace();
		this.setCenter(place.geometry.location);
	}
	
	radiusChange() {
		if (this.centerMarker != null){
			this.refreshMyCircle();
		}
	}
  
	reverseGeoCodeResult(result, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			this.refs.autocomplete.value = result[0].formatted_address;
		} else {
			alert('ReverseGeoCode Error: ' + status);
		}
	}
  
 	clickMapEvent(event) {
 		if (this.state.editMode === 'circle') {
 			this.circleMarker = this.refreshMarker(this.circleMarker, event.latLng, 'marker');
 			this.refreshMyCircle();
 			var geocoder = new google.maps.Geocoder;
 			geocoder.geocode({'location': event.latLng}, this.reverseGeoCodeResult.bind(this));
 		}
	}
  
	activeCircle() {
		if (this.state.editMode == 'circle') {
			this.desactiveCircle();
		} else {
			this.setState({ editMode: 'circle' });
		}
	}
  
	desactiveCircle() {
		this.deleteMarker(this.circleMarker);
		this.deleteCircle(this.myCircle);
		this.refs.autocomplete.value = '';
		this.refs.radius.value = '';
		this.setState({editMode: null});
	}
  
  	validCircle() {
  	/*
	  console.log("###########################################INFO###########################################");
	  console.log(this.circleMarker);
	  console.log(this.myCircle);
	  console.log( this.refs.autocomplete.value);
	  console.log(this.circleMarker.position.lat());
	  console.log("##########################################################################################");
	  */
	    let geoZone = {lattitude: this.circleMarker.position.lat(), longitude: this.circleMarker.position.lng(), radius: this.myCircle.radius};
	    this.props.sendGeoZone(geoZone);
	    this.setState({
	    	areas: this.state.areas.concat({
	    		type: 'circle',
	    		adress: this.refs.autocomplete.value,
	    		marker: this.circleMarker,
	    		circle: this.myCircle
	    	})
	    });
	    this.circleMarker = null;
	    this.myCircle = null;
	    this.desactiveCircle();
	}

	deleteArea(index) {
		let marker = this.state.areas[index].marker;
		let circle =  this.state.areas[index].circle;
		let geoZone = {
			lattitude: marker.position.lat(), 
			longitude: marker.position.lng(), 
			radius: circle.radius
		};
		this.props.deleteGeoZone(geoZone);
		this.deleteMarker(marker);
		this.deleteCircle(circle);
		this.state.areas.splice(index, 1);
		this.setState({ areas: this.state.areas });
	}
}
