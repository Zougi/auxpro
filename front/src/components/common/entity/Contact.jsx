// lib modules
import React from 'react';
import moment from 'moment';
// custom modules
import Utils from 'utils/Utils.js'
import PhoneValidator from 'utils/form/PhoneValidator.js'
import EmailValidator from 'utils/form/EmailValidator.js'
// custom components
import FormGoogleAutocomplete from 'components-lib/Form/FormGoogleAutocomplete.jsx'
import FormInput from 'components-lib/Form/FormInput.jsx'

class Contact extends React.Component {
	
	constructor(props) {
		super(props);
		this.onComponentWillReceiveProps(props);
	}

	onComponentWillReceiveProps(props) {
		this.contact = {
		};
	}

	notify() {
		if (this.props.onChange) {
			this.props.onChange({
				address: this.contact.address || this.props.address || {},
				phone: this.contact.phone || this.props.phone || null,
				email: this.contact.email || this.props.email || null
			});
		}
	}

    onAutocompleteChanged(address) {
		this.contact.address = address;
    	this.notify();
	}
	onPhoneChanged(event) {
		this.contact.phone = event.value;
		this.notify();
	}
	onEmailChanged(event) {
		this.contact.email = event.value;
		this.notify();
	}

	render() {

		return (
		<div>
			{this.props.edit ?
			<FormGoogleAutocomplete 
				edit={this.props.edit}
				onChange={this.onAutocompleteChanged.bind(this)}
				placeholder={this.props.address + ', ' + this.props.postalCode + ' ' + this.props.city}/>
			: '' }
			<FormInput 
				validator={null}
				edit={false}
				title='Addresse'
				value={this.props.address} />
			<FormInput
				validator={null}
				edit={false}
				title='Code postal'
				value={this.props.postalCode} />
			<FormInput
				validator={null}
				edit={false}
				title='Ville'
				value={this.props.city} />
			<FormInput
				validator={null}
				edit={false}
				title='Pays'
				value={this.props.country} />
			<FormInput 
				validator={PhoneValidator}
				edit={this.props.edit}
				title='Téléphone'
				defaultValue={this.props.phone} 
				onChange={this.onPhoneChanged.bind(this)}/>
			<FormInput 
				validator={new EmailValidator()}
				edit={this.props.edit}
				title='Addresse électronique'
				defaultValue={this.props.email} 
				onChange={this.onEmailChanged.bind(this)}/>
		</div>
		);
	}
}

export default Contact;