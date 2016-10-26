import React from 'react'
import { Row, Col, Panel } from 'react-bootstrap'

import GoogleAutocomplete from 'components-lib/Map/GoogleAutocomplete.jsx'
import APButton from 'lib/Button/ApButton.jsx'


class AuxiliaryAddZone extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			address: {
				postalCode: "",
				city: ""
			},
			radius: 0
		}
	}
	
	componentWillReceiveProps(nextProps) {
		//var nextDefaultLocation = nextProps.defaultLocation;
		//if (!this.props.defaultLocation  || (nextDefaultLocation.lattitude != this.props.defaultLocation.lattitude && nextDefaultLocation.longitude != this.props.defaultLocation.longitude))
		//	this.getDefaultValue(nextProps)
	}
	
	reverseGeoCodeResult(result, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			console.log(result);
			this.setState({ defaultValue: result[0].formatted_address });
		} else {
			alert('ReverseGeoCode Error: ' + status);
		}
	}
	
	getDefaultValue(props) {
		if (props.defaultLocation) {
			var latLng = new google.maps.LatLng(props.defaultLocation.lattitude, props.defaultLocation.longitude);
			var geocoder = new google.maps.Geocoder;
			geocoder.geocode({'location': latLng}, this.reverseGeoCodeResult.bind(this));
		}
	}
	
	onAutocompleteChanged(address) {
		var change = {
			address: {
				postalCode: address.postalCode,
				city: address.city,
				lattitude: address.lattitude,
				longitude: address.longitude
			},
			radius: this.state.radius
		}
		
		this.setState({ address: change.address });
		this.props.onChange(change);
	}
	
	onRadiusChanged (radius) {
		if (this.state.address.postalCode != "") {
			var change = {
				address: {
					postalCode: this.state.address.postalCode,
					city: this.state.address.city,
					lattitude: this.state.address.lattitude,
					longitude: this.state.address.longitude
				},
				radius: radius.target.value
			}
			this.setState({ radius: change.radius });
			this.props.onChange(change);
		}
	}
	
	valid() {
		if (this.state.address.postalCode != "" && this.state.radius != 0) {
			var change = {
				address: {
					postalCode: this.state.address.postalCode,
					city: this.state.address.city,
					lattitude: this.state.address.lattitude,
					longitude: this.state.address.longitude
				},
				radius: this.state.radius
			}
			this.props.valid(change);
		}
	}

	render() {
		return (
			<Panel header="Nouvelle zone d'intervention">
				<GoogleAutocomplete
					edit={true}
					onChange={this.onAutocompleteChanged.bind(this)}
					defaultValue={this.state.defaultValue}/>
				<input type="number" onChange={this.onRadiusChanged.bind(this)} step="5"/>
				<APButton block
					bsStyle='success'
					onClick={this.valid.bind(this)}>
					Valider
				</APButton>
			</Panel>
		);
	}
}

export default AuxiliaryAddZone;
