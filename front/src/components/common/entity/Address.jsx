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
		this.state = {
			edit: props.edit || false,
			address: {}
		};
	}

	componentDidMount () {		
		this.autocomplete = new google.maps.places.Autocomplete(this.refs.autocomplete, {types: ['geocode']});
		this.autocomplete.addListener('place_changed', this.autocompleteChange.bind(this));
	}
	
	autocompleteChange() {
		var place = this.autocomplete.getPlace();
		var address = {
			address: '',
			city: '',
			postalCode: '',
			country: ''
		}
		
		for (var i = 0; i < place.address_components.length; i++) {
			var addressType = place.address_components[i].types[0];
			if (addressType == "street_number") {
				address.address = place.address_components[i].long_name + " " + address.address;
			}
			else if (addressType == "route"){
				address.address = address.address + place.address_components[i].long_name;
			}
			else if (addressType == "locality"){
				address.city = place.address_components[i].long_name;
			}
			else if (addressType == "country"){
				address.country = place.address_components[i].long_name;
			}	
			else if (addressType == "postal_code"){
				address.postalCode = place.address_components[i].long_name;
			}
		};
		this.setState({address: address});
		this.notify(); 
	}
	
	componentWillReceiveProps(props) {
		this.state.edit = props.edit || false;
		if (!this.state.edit) {
			this.state.address = props.address;
		}
	}

	notify() {
		if (this.props.onChange) {
			this.props.onChange(this.state.address);
		}
	}

	changeHandler(field) { 
		return function (event) {
			Utils.setField(this.state.address, field, event.target.value); 
			this.notify(); 
		}.bind(this);
	}

	render() {
		let fields = FIELDS.map(function(f) {
			return (
				<FormInput 
					static={!this.state.edit}
					key={f.title}
					title={f.title}
					defaultValue={Utils.getField(this.state.address, f.path)} 
					onChange={this.changeHandler(f.path)}/>
			);
		}.bind(this));

		return (
		<div>
			<input ref="autocomplete" className='autocomplete' placeholder="Enter address"  type="text" disabled={!this.state.edit}></input>
			{fields}
		</div>
		);
	}	

}

export default Address;