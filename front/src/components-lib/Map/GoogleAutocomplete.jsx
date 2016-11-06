import React from 'react'

import './GoogleAutocomplete.css'

/**
 * A react component wrapping a GoogleAutocomplete
 */
class GoogleAutocomplete extends React.Component {

  	constructor(props) {
  		super(props);
		console.log("CONSTRUCT")
		console.log(props)
		if (props.location)
			this.state = {location: props.location};
  	}

  	componentDidMount() {
  		 this.autocomplete = new google.maps.places.Autocomplete(this.input);
  		 this.autocomplete.addListener('place_changed', this._autocompleteChange.bind(this));
  	}

	componentWillReceiveProps(nextProps) {
		console.log("RECEIVE PROPS")
		console.log(nextProps)
		if (nextProps.location) {
			this.getDefaultValue(nextProps)
			this.setState({location: nextProps.location});
		}
		
		//var nextDefaultLocation = nextProps.location;
		//if (!this.props.location  || (nextDefaultLocation.lattitude != this.props.location.lattitude && nextDefaultLocation.longitude != this.props.location.longitude))
		//	this.getDefaultValue(nextProps)
	}
	
	reverseGeoCodeResult(result, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			console.log("RESULT");
			this.input.value = result[0].formatted_address;
			console.log(result);
		} else {
			alert('ReverseGeoCode Error: ' + status);
		}
	}
	
	getDefaultValue(props) {
		var latLng = new google.maps.LatLng(props.location.lattitude, props.location.longitude);
		var geocoder = new google.maps.Geocoder;
		geocoder.geocode({'location': latLng}, this.reverseGeoCodeResult.bind(this));
	}
	
  	_autocompleteChange() {
  		var place = this.autocomplete.getPlace();
		
		console.log("AUTOCOMPLETE RAW")
		console.log(place)

  		var l = place.address_components.length;
  		for (var i = 0; i < l; i++) {
			let comp = place.address_components[i];
			place[comp.types[0]] = comp.long_name;			
		}

		this.setState({location: {lattitude: place.geometry.location.lat(), longitude: place.geometry.location.lng()}});
		
  		if (this.props.onChange) {
  			this.props.onChange({
  				lattitude: place.geometry.location.lat(),
  				longitude: place.geometry.location.lng(),
  				address: place.street_number + ' ' + place.route,
  				postalCode: place.postal_code,
  				city: place.locality,
  				country: place.country
  			});
  		}
  	}

	render() {
		console.log("RENDER")
		console.log(this.state)
		return (
			<input 
				className='ap-google-autocomplete autocomplete form-control'
				disabled={!this.props.edit}
				placeholder={!this.props.edit ? (this.props.placeholder || '') : 'Saisir addresse'}
				type='text'
				ref={(c) => { this.input = c; } } />
  		);
  	}
}

export default GoogleAutocomplete;