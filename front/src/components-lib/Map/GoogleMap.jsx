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
		this.mapListener;
	}

	componentDidMount() {
		let center = new google.maps.LatLng(
			this.props.center.lattitude,
			this.props.center.longitude
		);

		let mapOptions = {
			center: center,
			zoom: 12,
			streetViewControl: this.props.streetView || false,
			mapTypeControlOptions: { mapTypeIds: this.props.mapTypes || [] },
			clickableIcons: this.props.clickableIcons ? true : false
		}

		this.mapHelper = new GoogleMapHelper(this.mapDiv, mapOptions);
		
		if (this.props.onMapClicked) {
			this.mapListener = google.maps.event.addListener(this.mapHelper.map , 'click', function(e) {
				this.props.onMapClicked({
					lattitude: e.latLng.lat(),
					longitude: e.latLng.lng()
				});
			}.bind(this));
		}
		
		this._buildMarkers();
		this._buildCircles();
		
	}	
	
	shouldComponentUpdate (nextProps, nextState) {	
		this._updateMapListener(nextProps);
		this.mapHelper.updateMarkers(nextProps.markers);
		this.mapHelper.updateCircles(nextProps.circles);

		return false;
	}
	
	_updateMapListener(nextProps) {
		if (nextProps.onMapClicked) {
			if (this.props.onMapClicked != nextProps.onMapClicked) {
				if (this.mapListener)
					google.maps.event.removeListener(this.mapListener);
				this.mapListener =  google.maps.event.addListener(this.mapHelper.map , 'click', function(e) {
					nextProps.onMapClicked({
						lattitude: e.latLng.lat(),
						longitude: e.latLng.lng()
					});
				});
			}
		}
	}
	
	_buildMarkers() {
		let l = (this.props.markers || []).length;
		for (let i = 0; i < l; i++) {
			this.mapHelper.addMarker(this.props.markers[i]);
		}
	}

	_buildCircles() {
		let l = (this.props.circles || []).length;
		for (let i = 0; i < l; i++) {
			let circle = this.props.circles[i];
			this.mapHelper.addCircle(circle);
		}
	}

	render() {
		
		return (
			<div ref={(c) => this.mapDiv = c} className='ap-google-map'></div>
		);
	}
}

export default GoogleMap;
