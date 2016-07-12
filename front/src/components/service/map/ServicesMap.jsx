import Dispatcher from '../../../core/Dispatcher';
import StoreRegistry from '../../../core/StoreRegistry';

import React from 'react'
import ReactDOM from 'react-dom'
import { Grid, Row, Col } from 'react-bootstrap'
import { Button, Panel, Nav, Navbar } from 'react-bootstrap'
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

class ServicesMap extends React.Component {

  constructor(props) {
    super(props);
	this.myMap = null;
	this.initialZoom = 12;
	this.defaultCenter = {
            mapCenterLat: 48.856996,
            mapCenterLng: 2.346996,
	};
	
	this.centerMarker = null;
	this.customersMarkers = [];
	this.infoPanel = {
			name: null,
			phone: null,
			email: null,
			address: null,
			city: null,
			postalCode: null,
			country:null
			
		}
  }
  
  	componentWillMount () {
		this.setState({InfoPanel: this.infoPanel});
	}
  
	componentDidMount () {
        
		StoreRegistry.register('SERVICE_STORE', this, this.onServiceUpdate.bind(this));
	}
	
	 componentWillUnmount() {
        StoreRegistry.unregister('SERVICE_STORE', this);   
    }
	
	onServiceUpdate() {
		var that = this;
		let user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
		let data = StoreRegistry.getStore('SERVICE_STORE').getData('/service/' + user.id);
		
		if (this.myMap == null) {
			let address = data.service.contact.address;
			if (address && address.lattitude) {
				this.defaultCenter.mapCenterLat = address.longitude;
				this.defaultCenter.mapCenterLng = address.lattitude;
			}
				
			
			var mapOptions = {
				center: new google.maps.LatLng(this.defaultCenter.mapCenterLat, this.defaultCenter.mapCenterLng),
				zoom: this.initialZoom
			}
			this.myMap = new google.maps.Map(this.refs.myMap, mapOptions);
			
			this.centerMarker  = new google.maps.Marker({position: mapOptions.center, title: 'Ma Position', map: this.myMap});
			google.maps.event.addListener(this.centerMarker , 'click', function() {
				console.log(data);
				that.fillInfoPanel(data.service);
				that.setState({InfoPanel: that.infoPanel});
			});
			this.myMap.setCenter(mapOptions.center);
		}
		
		let customers = data.customers;
		let marker;
		let latLong;
		if (customers) {
			for (let i = 0; i < customers.length; i++) {
				let address =  customers[i].contact.address;
				console.log(customers[i]);
				
				if (address && address.lattitude) {
					latLong = new google.maps.LatLng(address.lattitude, address.longitude);
					marker  = new google.maps.Marker({position: latLong, title: 'Info', map: this.myMap});
					marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
					this.customersMarkers.push(marker);
					google.maps.event.addListener(marker , 'click', function() {
						that.fillInfoPanel(customers[i]);
						that.setState({InfoPanel: that.infoPanel});
					});
				}
			}
		}
		
	}
	
	fillInfoPanel(userInfo) {
		let name;
		if (userInfo.person)
			name = userInfo.person.civility + " " + userInfo.person.firstName  + " " + userInfo.person.lastName;
		else
			name = userInfo.society;
		this.infoPanel = {
			name: name,
			phone: userInfo.contact.phone,
			email: userInfo.contact.email,
			address: userInfo.contact.address.address,
			city: userInfo.contact.address.city,
			postalCode: userInfo.contact.address.postalCode,
			country:userInfo.contact.address.country
		}
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
  
  	setCenter(location){
			this.deleteMarker(this.centerMarker);
			this.centerMarker = this.addMarker(location, "center");
			this.myMap.setCenter(location);
	}
  
  render() {
      return (
			<Row>
			<Col sm={4}>
				<Panel header="Informations">
					<p>{this.state.InfoPanel.name}</p>
					<p>{this.state.InfoPanel.phone}</p>
					<p>{this.state.InfoPanel.email}</p>
					<p>{this.state.InfoPanel.address} {this.state.InfoPanel.city}</p>
					<p>{this.state.InfoPanel.postalCode} {this.state.InfoPanel.country}</p>
				</Panel>
			</Col>
			<Col sm={8}>
				<div ref="myMap" className='map-gic container'></div>
			</Col>
		</Row>
	);
  }
}

export default ServicesMap;
//onFocus={this.geolocate.bind(this)}