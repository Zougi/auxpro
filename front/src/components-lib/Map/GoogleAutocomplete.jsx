import React from 'react'

import './GoogleAutocomplete.css'

/**
 * A react component wrapping a GoogleAutocomplete
 */
class GoogleAutocomplete extends React.Component {

  	constructor(props) {
  		super(props);
		if (props.location)
			this.getDefaultValue(props)
			this.state = {location: props.location};
  	}

  	componentDidMount() {
  		 this.autocomplete = new google.maps.places.Autocomplete(this.input);
  		 this.autocomplete.addListener('place_changed', this._autocompleteChange.bind(this));
  	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.location && (!this.state.location || this.state.location.lattitude != nextProps.location.lattitude || this.state.location.longitude != nextProps.location.longitude)) {
			this.getDefaultValue(nextProps)
			this.setState({location: nextProps.location});
		}
		
		//var nextDefaultLocation = nextProps.location;
		//if (!this.props.location  || (nextDefaultLocation.lattitude != this.props.location.lattitude && nextDefaultLocation.longitude != this.props.location.longitude))
		//	this.getDefaultValue(nextProps)
	}
	
	reverseGeoCodeResult(result, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			this.input.value = result[0].formatted_address;
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