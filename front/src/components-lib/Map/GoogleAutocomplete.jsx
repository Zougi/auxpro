import React from 'react'

import './GoogleAutocomplete.css'

/**
 * A react component wrapping a GoogleAutocomplete
 */
class GoogleAutocomplete extends React.Component {

  	constructor(props) {
  		super(props);
		this.state = {deFaultValue: props.defaultValue};
  	}

  	componentDidMount() {
  		 this.autocomplete = new google.maps.places.Autocomplete(this.input);
  		 this.autocomplete.addListener('place_changed', this._autocompleteChange.bind(this));
  	}

	componentWillReceiveProps(nextProps) {
		this.setState({deFaultValue: nextProps.defaultValue});
	}
	
  	_autocompleteChange() {
  		var place = this.autocomplete.getPlace();

  		var l = place.address_components.length;
  		for (var i = 0; i < l; i++) {
			let comp = place.address_components[i];
			place[comp.types[0]] = comp.long_name;			
		}

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
				ref={(c) => { this.input = c; } }
				defaultValue={this.state.defaultValue}	/>
  		);
  	}
}

export default GoogleAutocomplete;