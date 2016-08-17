import React from 'react'
import ReactDOM from 'react-dom'
import { Grid, Row, Col } from 'react-bootstrap'
import { Button, Panel, Nav, Navbar } from 'react-bootstrap'
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

import { DEFAULTS } from './MapConstants.js';

class Map extends React.Component {

  constructor(props) {
    super(props);
	this.myMap = null;
	
	this.initialZoom = this.props.zoom || DEFAULTS.zoom;
	if (this.props.center) {
			this.initialCenter  = new google.maps.LatLng(this.props.center.lat, this.props.center.lng);
		} else {
			this.initialCenter  = new google.maps.LatLng(DEFAULTS.center.lat, DEFAULTS.center.lng);
		}
	this.markers = this.props.markers || []
  }
  
  
	componentDidMount () {
		var mapOptions = {center: this.initialCenter, zoom: this.initialZoom}
		this.myMap = new google.maps.Map(this.refs.myMap, mapOptions);
		
		var centerMarker  = new google.maps.Marker({position: mapOptions.center, title: 'Ma Position', map: this.myMap});
		google.maps.event.addListener(centerMarker , 'click', function() {
			alert("click");
		});
		this.myMap.setCenter(mapOptions.center);
		
		console.log(this.markers);
		this.markers = this.markers.map(function(marker) {
			var position = new google.maps.LatLng(marker.lat, marker.lng);
			var func = marker.func
			marker = new google.maps.Marker({position: position, title: 'Marker', map: this.myMap});
			if (func) {
				google.maps.event.addListener(marker , 'click', func);
			}
			return (marker);
		}.bind(this))
		console.log(this.markers)
	}
  
  render() {
		return (
			<div ref="myMap" className='map-gic container'></div>
		);
  }
}

export default Map;

	//TEST
	// getMarkers() {
		// return ([{lat: 48.892122, lng: 2.387488, func: function(){alert("JE SUIS UN MARKER")}},
						// {lat: 48.892111, lng: 2.389853, func: function(){alert("JE SUIS UN MARKER")}},
						// {lat: 48.892633, lng: 2.389687, func: function(){alert("JE SUIS UN MARKER")}},
						// {lat: 48.895179, lng: 2.390958, func: function(){alert("JE SUIS UN MARKER")}},
						// {lat: 48.895817, lng: 2.387230, func: function(){alert("JE SUIS UN MARKER")}},
						// {lat: 48.894110, lng: 2.386023, func: function(){alert("JE SUIS UN MARKER")}},
						// {lat: 48.893934, lng: 2.388416, func: function(){alert("JE SUIS UN MARKER")}},
						// {lat: 48.892122, lng: 2.387488, func: function(){alert("JE SUIS UN MARKER")}}])
	// }
	// center={{lat: 48.892122, lng: 2.387488}} 
	// <Map zoom={12} markers={this.getMarkers()}/>