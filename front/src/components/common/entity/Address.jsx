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
		this.state = {};
	}

	componentDidMount () {		
		this.autocomplete = new google.maps.places.Autocomplete(this.refs.autocomplete, {types: ['geocode']});
		this.autocomplete.addListener('place_changed', this.autocompleteChange.bind(this));
	}
	
	autocompleteChange() {
		var place = this.autocomplete.getPlace();

		this.state.address = '';

		for (var i = 0; i < place.address_components.length; i++) {
			let comp = place.address_components[i];
			switch(comp.types[0]) {
				case 'street_number':
					this.state.address = comp.long_name + ' ' + this.state.address;
					break;
				case 'route':
					this.state.address = this.state.address + ' ' + comp.long_name;
					break;
				case 'locality':
					this.state.city = comp.long_name;
					break;
				case 'country':
					this.state.country = comp.long_name;
					break;
				case 'postal_code':
					this.state.postalCode = comp.long_name;
					break;
			}
		};
		this.notify(); 
	}
	
	notify() {
		if (this.props.onChange) {
			this.props.onChange({
				address: this.state.address || this.props.address || '',
				city: this.state.city || this.props.city || '',
				postalCode: this.state.postalCode || this.props.postalCode || '',
				country: this.state.country || this.props.country || ''
			});
		}
	}

	onAddressChanged(value) {
		this.state.address = value;
		this.notify();
	}
	onCityChanged(value) {
		this.state.city = value;
		this.notify();
	}
	onPostalCodeChanged(value) {
		this.state.postalCode = value;
		this.notify();
	}
	onCountryChanged(value) {
		this.state.country = value;
		this.notify();
	}

	render() {
		return (
		<div>
			<input ref="autocomplete" className='autocomplete' placeholder="Enter address"  type="text" disabled={!this.props.edit}></input>
			<FormInput 
				static={!this.props.edit}
				title='Address'
				defaultValue={this.props.address} 
				onChange={this.onAddressChanged.bind(this)}/>
			<FormInput 
				static={!this.props.edit}
				title='Ville'
				defaultValue={this.props.city} 
				onChange={this.onCityChanged.bind(this)}/>
			<FormInput 
				static={!this.props.edit}
				title='Code postal'
				defaultValue={this.props.postalCode} 
				onChange={this.onPostalCodeChanged.bind(this)}/>
			<FormInput 
				static={!this.props.edit}
				title='Pays'
				defaultValue={this.props.country} 
				onChange={this.onCountryChanged.bind(this)}/>
		</div>
		);
	}	

}

export default Address;