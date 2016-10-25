import React from 'react'
import { Row, Col, Panel } from 'react-bootstrap'

import GoogleAutocomplete from 'components-lib/Map/GoogleAutocomplete.jsx'


class AuxiliaryAddZone extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			address: {
				postalCode: "",
				city: ""
			},
			defaultValue: ""
		}
	}
	
	
	reverseGeoCodeResult(result, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			console.log(result);
			this.setState({ defaultValue: result[0].formatted_address });
		} else {
			alert('ReverseGeoCode Error: ' + status);
		}
	}
	
	getDefaultValue() {
		if (this.props.defaultLocation) {
			console.log("LOCATION")
			var latLng = new google.maps.LatLng(this.props.defaultLocation.lattitude, this.props.defaultLocation.longitude);
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
			radius: 0
		}
		
		this.setState({ 
			address: change.address
		});
		this.props.onChange(change);
	}

	render() {
		return (
			<Panel header="Nouvelle zone d'intervention">
				<GoogleAutocomplete
					edit={true}
					onChange={this.onAutocompleteChanged.bind(this)}
					defaultValue={this.state.defaultValue}/>
			</Panel>
		);
	}
}

export default AuxiliaryAddZone;
