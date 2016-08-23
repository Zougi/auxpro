import React from 'react'

import GoogleMapHelper from './GoogleMapHelper.js'

class GoogleMap extends React.Component {

  	constructor(props) {
  		super(props);
  	}
  
	componentWillMount () {
		this.setState({
			editMode: null,
			areas: []
		});		
	}
  
	componentDidMount () {
		
        let center = new google.maps.LatLng(
        	Number(this.props.auxiliary.contact.address.lattitude),
        	Number(this.props.auxiliary.contact.address.longitude)
        );

        let mapOptions = {
            center: center,
            zoom: 12
        }

		this.mapHelper = new GoogleMapHelper(this.mapDiv, mapOptions);
        
 		this.centerMarker = this.mapHelper.addMarker({ 
 			position: center,
 			title: 'Mon addresse'
 		});

 		let areas = [];
 		let l = this.props.geoZones.length;
		for (let i = 0; i < l; i++) {
			let geoZone = this.props.geoZones[i];
			let location = new google.maps.LatLng(geoZone.lattitude, geoZone.longitude);
			let marker = this.mapHelper.addMarker({
				position: location, 
				title: 'zone',
				icon: this.mapHelper.getMarkerImage(this.mapHelper.MARKER_COLOR_RED)
			});
			let circle = this.addCircle(location, parseFloat(geoZone.radius));
			let geozone = {type: 'circle', adress: 'No adress', marker: marker, circle: circle}
			areas.push(geozone);;
		}

		/*
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
	
	

	render() {
		return (
			<div ref={(c) => this.mapDiv = c} className='map-gic'></div>
  		);
  	}
}

export default GoogleMap;
