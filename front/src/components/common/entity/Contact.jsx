// lib modules
import React from 'react';
import moment from 'moment';
// custom modules
import Utils from '../../../utils/Utils.js'
// custom components
import FormInput from '../form/FormInput.jsx'

class Contact extends React.Component {
	
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
				phone: props.phone,
				email: props.email
			}
		};
    }

	notify() {
		if (this.props.onChange) {
			this.props.onChange(this.state.data);
		}
		this.setState(this.state);
	}

	onPhoneChanged(value) {
		this.state.data.phone = value;
		this.notify();
	}
	onEmailChanged(value) {
		this.state.data.email = value;
		this.notify();
	}

	render() {
		return (
		<div>
			<FormInput 
				static={!this.state.edit}
				title='Téléphone'
				defaultValue={this.state.data.phone} 
				onChange={this.onPhoneChanged.bind(this)}/>
			<FormInput 
				static={!this.state.edit}
				title='Addresse électronique'
				defaultValue={this.state.data.email} 
				onChange={this.onEmailChanged.bind(this)}/>
		</div>
		);
	}
}

export default Contact;