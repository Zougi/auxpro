// lib modules
import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
// custom modules
import Utils from '../../../utils/Utils.js'
// custom components
import FormInput from '../form/FormInput.jsx'

let FIELDS = [
	{ title: 'Addresse', path: 'address', type: 'input'},
	{ title: 'Ville', path: 'city', type: 'input' },
	{ title: 'Code postal', path: 'postalCode', type: 'input' },
	{ title: 'Pays', path: 'country', type: 'input' }
]

class Address extends React.Component {

	constructor(props) {
		super(props);
			this.state = this._buildState(props);
	}

	componentWillReceiveProps(props) {
		this.setState(this._buildState(props));
	}

	_buildState(props) {
    	return {  
			edit: props.edit || false,
			data: {
				address: props.address,
				city: props.city,
				postalCode: props.postalCode,
				country: props.country
			}
		};
    }

	componentDidMount () {		
		this.autocomplete = new google.maps.places.Autocomplete(this.refs.autocomplete, {types: ['geocode']});
		this.autocomplete.addListener('place_changed', this.autocompleteChange.bind(this));
	}
	
	autocompleteChange() {
		var place = this.autocomplete.getPlace();

		this.state.data.address = '';

		for (var i = 0; i < place.address_components.length; i++) {
			let comp = place.address_components[i];
			switch(comp.types[0]) {
				case 'street_number':
					this.state.data.address = comp.long_name + ' ' + this.state.data.address;
					break;
				case 'route':
					this.state.data.address = this.state.data.address + ' ' + comp.long_name;
					break;
				case 'locality':
					this.state.data.city = comp.long_name;
					break;
				case 'country':
					this.state.data.country = comp.long_name;
					break;
				case 'postal_code':
					this.state.data.postalCode = comp.long_name;
					break;
			}
		};
		this.notify(); 
	}
	
	notify() {
		this.setState(this.state);
		if (this.props.onChange) {
			this.props.onChange(this.state.data);
		}
	}

	onAddressChanged(value) {
		this.state.data.address = value;
		this.notify();
	}
	onCityChanged(value) {
		this.state.data.city = value;
		this.notify();
	}
	onPostalCodeChanged(value) {
		this.state.data.postalCode = value;
		this.notify();
	}
	onCountryChanged(value) {
		this.state.data.country = value;
		this.notify();
	}

	render() {
		return (
		<div>
			<input ref="autocomplete" className='autocomplete' placeholder="Enter address"  type="text" disabled={!this.state.edit}></input>
			<FormInput 
				static={!this.state.edit}
				title='Address'
				value={this.state.data.address} 
				onChange={this.onAddressChanged.bind(this)}/>
			<FormInput 
				static={!this.state.edit}
				title='Ville'
				value={this.state.data.city} 
				onChange={this.onCityChanged.bind(this)}/>
			<FormInput 
				static={!this.state.edit}
				title='Code postal'
				value={this.state.data.postalCode} 
				onChange={this.onPostalCodeChanged.bind(this)}/>
			<FormInput 
				static={!this.state.edit}
				title='Pays'
				value={this.state.data.country} 
				onChange={this.onCountryChanged.bind(this)}/>
		</div>
		);
	}	

}

export default Address;