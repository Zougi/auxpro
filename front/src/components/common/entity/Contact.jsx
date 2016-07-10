// lib modules
import React from 'react';
import moment from 'moment';
// custom modules
import Utils from '../../../utils/Utils.js'
// custom components
import FormInput from '../form/FormInput.jsx'

let CONTACT_FIELDS = [
	{ title: 'Téléphone', path: 'phone', type: 'input' },
	{ title: 'Addresse électronique', path: 'email', type: 'input' }
]

class Contact extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			edit: props.edit || false,
			contact: { }
		};
	}

	componentWillReceiveProps(props) {
		this.state.edit = props.edit || false;
		if (!this.state.edit) {
			this.state.contact = { };	
		}
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
		
		console.log(place);
		
		for (var i = 0; i < place.address_components.length; i++) {
			var addressType = place.address_components[i].types[0];
			if (addressType == "street_number") {
				address.address = place.address_components[i].long_name + address.address;
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
		var contact = this.state.contact;
		contact.address = address;
		console.log(contact);
		this.setState({contact: contact});
		console.log(this.state);
	}

	notify() {
		if (this.props.onChange) {
			this.props.onChange(this.state.contact);
		}
	}

	changeHandler(field) { 
		return function (event) {
			Utils.setField(this.state.contact, field, event.target.value); 
			this.notify(); 
		}.bind(this);
	}

	render() {
		console.log("RREEEEEEEEEEEEEEEEEEEEEEENNNNNNNNNNNNNNNNNNDDDDDDDDDDEEEEEEEEEEERRRRRRRRRRRRRRRRRRR");
		console.log(this.state);
		console.log("RREEEEEEEEEEEEEEEEEEEEEEENNNNNNNNNNNNNNNNNNDDDDDDDDDDEEEEEEEEEEERRRRRRRRRRRRRRRRRRR");
		let fields = CONTACT_FIELDS.map(function(f) {
			return (
				<FormInput 
					static={!this.state.edit}
					key={f.title}
					title={f.title}
					defaultValue={Utils.getField(this.props.contact, f.path)} 
					onChange={this.changeHandler(f.path)}/>
			);
		}.bind(this));

		return (
		<div>
			<input ref="autocomplete" className='autocomplete' placeholder="Enter address"  type="text"></input>
			{fields}
		</div>
		);
	}
}

export default Contact;