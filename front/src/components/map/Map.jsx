import React from 'react'
import ReactDOM from 'react-dom'
import { Grid, Row, Col } from 'react-bootstrap'
import { Button, Panel, Nav, Navbar } from 'react-bootstrap'
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

class Map extends React.Component {

  constructor(props) {
    super(props);
	this.myMap = null;
	this.initialZoom = 12;
	this.defaultCenter = {
            mapCenterLat: 48.856996,
            mapCenterLng: 2.346996,
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
        
		var mapOptions = {
            center: new google.maps.LatLng(this.defaultCenter.mapCenterLat, this.defaultCenter.mapCenterLng),
            zoom: this.initialZoom
        }
        this.myMap = new google.maps.Map(this.refs.myMap, mapOptions);
		google.maps.event.addListener(this.myMap, 'click', this.clickMapEvent.bind(this));
		
		this.centerMarker  = new google.maps.Marker({position: mapOptions.center, title: 'Hi', map: this.myMap});
        this.centerMarker.setDraggable(true);
		google.maps.event.addListener(this.centerMarker , 'click', function() {
		alert("Le marqueur a été cliqué.");//message d'alerte
		});
		
		this.autocomplete = new google.maps.places.Autocomplete(this.refs.autocomplete, {types: ['geocode']});
		this.autocomplete.addListener('place_changed', this.autocompleteChange.bind(this));
    
		// var GeocoderOptions = {
	    // 'address' : 'Palais de l\'Elysée 55, rue du faubourg Saint-Honoré 75008  Paris',
	    // 'region' : 'FR'
		// }
		// function geocodingResult(results , status) {
		 // if(status == google.maps.GeocoderStatus.OK ) {
			// this.setCenter(results[0].geometry.location);
		  // }
		// }
		// var myGeocoder = new google.maps.Geocoder();
		// myGeocoder.geocode(GeocoderOptions, geocodingResult.bind(this));
		
		// this.refs.radius.addEventListener('change', this.radiusChange.bind(this));
	}
	
	addMarker(location, title) {
		return new google.maps.Marker({
			  position: location,
			  map: this.myMap,
			  title: title
			});
	}
	
	deleteMarker(marker){
		 if(marker != null) {
			  marker.setMap(null);
			}
	}
	
	refreshMarker(marker, location, title){
		this.deleteMarker(marker);
		return this.addMarker(location, title);
	}
	
	addCircle(position, radius){
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
	
	deleteCircle(circle){
		 if(circle != null) {
			  circle.setMap(null);
			}
	}
	
	refreshCircle(circle, position, radius){
		this.deleteCircle(circle);
		return this.addCircle(position, radius);
	}
	
	refreshMyCircle(){
		this.myCircle = this.refreshCircle(this.myCircle, this.circleMarker.position, parseInt(this.refs.radius.value));
	}
  
  	setCenter(location){
			this.deleteMarker(this.centerMarker);
			this.centerMarker = this.addMarker(location, "center");
			this.myMap.setCenter(location);
	}
  
	autocompleteChange() {
		var place = this.autocomplete.getPlace();
		this.setCenter(place.geometry.location);
	}
	
	radiusChange(){
		if (this.centerMarker != null){
			this.refreshMyCircle();
		}
	}
  
  reverseGeoCodeResult(result, status) {
	  if (status === google.maps.GeocoderStatus.OK){
		  this.refs.autocomplete.value = result[0].formatted_address;
	  } else{
		 alert("ReverseGeoCode Error: " + status);
	  }
  }
  
  clickMapEvent(event) {
	  if (this.state.editMode == "circle"){
		this.circleMarker = this.refreshMarker(this.circleMarker, event.latLng, "marker");
		this.refreshMyCircle();
		var geocoder = new google.maps.Geocoder;
		geocoder.geocode({'location': event.latLng}, this.reverseGeoCodeResult.bind(this));
	  }
  }
  
	activeCircle() {
		if (this.state.editMode == "circle"){
			this.desactiveCircle();
		} else{
			this.setState({editMode: "circle"});
		}
		//console.log(this.refs.autocomplete.disable);
	}
  
	desactiveCircle(){
		this.deleteMarker(this.circleMarker);
		this.deleteCircle(this.myCircle);
		this.refs.autocomplete.value = "";
		this.refs.radius.value = "";
		this.setState({editMode: null});
	}
  
  validCircle(){
	 this.setState({areas: this.state.areas.concat({type: "circle", adress: this.refs.autocomplete.value, marker: this.circleMarker, circle: this.myCircle})});
	 this.circleMarker = null;
	 this.myCircle = null;
	 this.desactiveCircle();
  }
  
  deleteArea(index){
	console.log(index);
	this.deleteMarker(this.state.areas[index].marker);
	this.deleteCircle(this.state.areas[index].circle);
	this.state.areas.splice(index, 1);
	this.setState({areas: this.state.areas});
  }
  
  	// geolocate() {
		// alert("geolocate");
		// if (navigator.geolocation) {
			// navigator.geolocation.getCurrentPosition(function(position) {
			  // var geolocation = {
				// lat: position.coords.latitude,
				// lng: position.coords.longitude
			  // };
			  // var circle = new google.maps.Circle({
				// center: geolocation,
				// radius: position.coords.accuracy
			  // });
			  // this.autocomplete.setBounds(circle.getBounds());
			// });
		  // }
	// }
  
  render() {
	console.log(this.state);
      return (
		<Row>
			<Col sm={2}>
				<Button bsStyle='success' onClick={this.activeCircle.bind(this)} block>active/desactive</Button>
				<input ref="autocomplete" className='autocomplete' placeholder="Enter address"  type="text" disabled={this.state.editMode != "circle"}></input>
				<input ref="radius" type="number" placeholder="Enter Radius" disabled={this.state.editMode != "circle"} onChange={this.radiusChange.bind(this)}></input>
				<Button bsStyle='success' onClick={this.validCircle.bind(this)} block>Valid</Button>
			</Col>
			<Col sm={8}>
				<div ref="myMap" className='map-gic container'></div>
			</Col>
			<Col sm={2}>
			{this.state.areas.map((area, index) => {
              return (
                <div onClick={this.deleteArea.bind(this, index)}> Type: {area.type} Adresse: {area.adress} Radius: {area.circle.radius}</div>
              );
            })}
			</Col>
		</Row>
  );
  }
}

export default Map;
//onFocus={this.geolocate.bind(this)}