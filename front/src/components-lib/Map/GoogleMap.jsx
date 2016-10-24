import React from 'react'

import GoogleMapHelper from './GoogleMapHelper.js'

import './GoogleMap.css'

/**
 * A react component wrapping a GoogleMap
 *
 * @props.center     : { lattitude: <number>, longitude: <number> }
 * @props.markers    : []
 * @props.circles    : []
 * @props.streetView : <boolean>
 * @props.mapTypes   : []
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
            zoom: 12,
            streetViewControl: this.props.streetView || false,
            mapTypeControlOptions: { mapTypeIds: this.props.mapTypes || [] }
        }

		this.mapHelper = new GoogleMapHelper(this.mapDiv, mapOptions);
	}	
	
	componentDidUpdate () {		
		if (this.props.onMapClicked) {
			google.maps.event.addListener(this.mapHelper.map , 'click', function(e) {
				this.props.onMapClicked({
					lattitude: e.latLng.lat(),
					longitude: e.latLng.lng()
				});
			}.bind(this));
		}
		this.mapHelper.cleanMarkers();
		this.mapHelper.cleanCircles();
 		this._buildMarkers();
 		this._buildCircles();
		this.mapHelper.resize();
	}
	
	_buildMarkers() {
		let l = (this.props.markers || []).length;
		for (let i = 0; i < l; i++) {
			let marker = this.props.markers[i];
			let googleMarker = this.mapHelper.addMarker(marker);
			if (this.props.onMarkerClicked) {
				google.maps.event.addListener(googleMarker , 'click', function() {
					this.props.onMarkerClicked(marker);
				}.bind(this));
			}
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
