import React from 'react'
import ReactDOM from 'react-dom'
import { Grid, Row, Col } from 'react-bootstrap'
import { Button, Panel, Nav, Navbar } from 'react-bootstrap'
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

import Dispatcher from '../../../core/Dispatcher';
import StoreRegistry from '../../../core/StoreRegistry';

class AuxiliaryMap extends React.Component {

  	constructor(props) {
  		super(props);
  		this.myMap = null;
  		this.initialZoom = 12;
  		this.defaultCenter = {
  			mapCenterLat: 48.856996,
  			mapCenterLng: 2.346996
  		};
  		this.centerMarker = null;
  		this.autocomplete = null;
  		this.circleMarker = null;
  		this.myCircle = null;
  	}
  
	componentWillMount () {
		this.setState({
			editMode: null,
			areas: []
		});		
	}
  
	componentDidMount () {
        console.log('map')
        console.log(this.props.auxiliary)

        let center = new google.maps.LatLng(
        	Number(this.props.auxiliary.contact.address.lattitude),
        	Number(this.props.auxiliary.contact.address.longitude)
        );

        let mapOptions = {
            center: center,
            zoom: 12
        }
        
        this.map = new google.maps.Map(this.refs.myMap, mapOptions);

        //google.maps.event.addDomListener(window, 'resize', this._triggerMapResize());

 		this.centerMarker = new google.maps.Marker({ 
 			map: this.map,
 			position: center, 
 			title: 'Mon addresse'
 		});

   		

		/*
		google.maps.event.addListener(this.myMap, 'click', this.clickMapEvent.bind(this));
		
		
        
        this.centerMarker.setDraggable(true);
		google.maps.event.addListener(this.centerMarker , 'click', function() {
			alert('Le marqueur a été cliqué.');
		});
		
		this.autocomplete = new google.maps.places.Autocomplete(this.refs.autocomplete, {types: ['geocode']});
		this.autocomplete.addListener('place_changed', this.autocompleteChange.bind(this));
		
		let areas = [];
		for (let i = 0; i < this.props.geoZones.length; i++) {
			let location = new google.maps.LatLng(this.props.geoZones[i].lattitude, this.props.geoZones[i].longitude);
			let marker = this.addMarker(location, 'zone');
			let circle = this.addCircle(location, parseFloat(this.props.geoZones[i].radius));
			let geozone = {type: 'circle', adress: 'No adress', marker: marker, circle: circle}
			areas.push(geozone);;
		}
		
		this.setState({areas: areas});
		*/
	}	
	
	componentDidUpdate () {
		this._triggerMapResize();
	}

	_triggerMapResize() {
		let prevCenter = this.map.getCenter();
 		google.maps.event.trigger(this.map, 'resize');
 		this.map.setCenter(prevCenter);
	}
	
	addMarker(location, title) {
		return new google.maps.Marker({
			position: location,
			map: this.myMap,
			title: title,
			key: title
		});
	}
	
	deleteMarker(marker) {
		if (marker != null) {
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
			map: this.myMap,
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
  		this.myMap.setCenter(location);
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

	render() {
		return (
				<Row>
				<Col sm={2}>
					<Button bsStyle='success' onClick={this.activeCircle.bind(this)} block>active/desactive</Button>
					<input ref='autocomplete' className='autocomplete' placeholder='Enter address'  type='text' disabled={this.state.editMode !== 'circle'}></input>
					<input ref='radius' type='number' placeholder='Enter Radius' disabled={this.state.editMode !== 'circle'} onChange={this.radiusChange.bind(this)}></input>
					<Button bsStyle='success' onClick={this.validCircle.bind(this)} block>Valid</Button>
				</Col>
				<Col sm={8}>
					<div ref='myMap' className='map-gic'></div>
				</Col>
				<Col sm={2}>
					{this.state.areas.map((area, index) => {
	              		return (
							<Panel onClick={this.deleteArea.bind(this, index)}>
								Type: {area.type} Adresse: {area.adress} Radius: {area.circle.radius}
							</Panel> 
	              		);
	            	})}
				</Col>
			</Row>
  		);
  	}
}

export default AuxiliaryMap;
//onFocus={this.geolocate.bind(this)}