import React from 'react'

import GoogleMapHelper from './GoogleMapHelper.js'

import './GoogleMap.css'

/**
 * A react component wrapping a GoogleMap
 *
 * @props.center: { lattitude: <number>, longitude: <number> }
 * @props.markers: []
 * 
 *
 */
class GoogleMap extends React.Component {

  	constructor(props) {
  		super(props);
  	}
  
	componentDidMount () {
        let center = new google.maps.LatLng(
        	this.props.center.lattitude,
        	this.props.center.longitude
        );

        let mapOptions = {
            center: center,
            zoom: 12
        }

		this.mapHelper = new GoogleMapHelper(this.mapDiv, mapOptions);
        
 		this._buildMarkers();
 		this._buildCircles();

		/*
 		let areas = [];
 		let l = this.props.markers.length;
		for (let i = 0; i < l; i++) {
			let marker = this.props.markers[i];
			let location = new google.maps.LatLng(marker.lattitude, marker.longitude);
			let googleMarker = this.mapHelper.addMarker({
				position: location, 
				title: 'zone',
				icon: this.mapHelper.getMarkerImage(this.mapHelper.MARKER_COLOR_RED)
			});
			let circle = this.addCircle(location, parseFloat(marker.radius));
			let geozone = {type: 'circle', adress: 'No adress', marker: marker, circle: circle}
			areas.push(geozone);;
		}

		google.maps.event.addListener(this.myMap, 'click', this.clickMapEvent.bind(this));
        
        this.centerMarker.setDraggable(true);
		google.maps.event.addListener(this.centerMarker , 'click', function() {
			alert('Le marqueur a été cliqué.');
		});
		
		this.autocomplete = new google.maps.places.Autocomplete(this.refs.autocomplete, {types: ['geocode']});
		this.autocomplete.addListener('place_changed', this.autocompleteChange.bind(this));
		
		
		
		this.setState({areas: areas});
		*/
	}	
	
	componentDidUpdate () {
		this.mapHelper.resize();
	}
	
	_buildMarkers() {
		let l = (this.props.markers || []).length;
		console.log(this.props)
		for (let i = 0; i < l; i++) {
			let marker = this.props.markers[i];
			let googleMarker = this.mapHelper.addMarker(marker);
		}
	}

	_buildCircles() {
		let l = (this.props.circles || []).length;
		for (let i = 0; i < l; i++) {
			let circle = this.props.circles[i];
			let googleCircle = this.mapHelper.addCircle(circle);
		}
	}

	render() {
		return (
			<div ref={(c) => this.mapDiv = c} className='ap-google-map'></div>
  		);
  	}
}

export default GoogleMap;
