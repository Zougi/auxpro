// lib modules
import React from 'react';
import moment from 'moment';
// custom modules
import Utils from '../../../utils/Utils.js'
// custom components
import FormInput from '../form/FormInput.jsx'

let DEFAULT_CONTACT = {
	address: {
		address: '',
		city: '',
		postalCode: '',
		country: ''
	},
	phone: '',
	email: '',
};

let CONTACT_FIELDS = [
	{ title: 'Addresse', path: 'address.address', type: 'input'},
	{ title: 'Ville', path: 'address.city', type: 'input' },
	{ title: 'Code postal', path: 'address.postalCode', type: 'input' },
	{ title: 'Pays', path: 'address.country', type: 'input' },
	{ title: 'Téléphone', path: 'phone', type: 'input' },
	{ title: 'Addresse électronique', path: 'email', type: 'input' }
]

class Contact extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			edit: props.edit || false,
			contact: props.contact ? props.contact : DEFAULT_CONTACT
		};
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
		let fields = CONTACT_FIELDS.map(function(f) {
			return (
				<FormInput 
					static={!this.state.edit}
					key={f.title}
					title={f.title}
					defaultValue={Utils.getField(this.state.contact, f.path)} 
					onChange={this.changeHandler(f.path)}/>
			);
		}.bind(this));

		return (
		<div>
			{fields}
		</div>
		);
	}
}

export default Contact;