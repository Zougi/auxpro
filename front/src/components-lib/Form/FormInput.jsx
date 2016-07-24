// react modules
import React from 'react'
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
// custom modules
import { DEFAULTS } from './FormConstants.js';
// custom components
import FormBase from './FormBase.jsx'

class FormInput extends FormBase {

	constructor(props) {
		super(props);
	}

	onChange(event) {
		if (this.props.onChange) {
			this.props.onChange(event.target.value);
		}
	}
	
	getFormControlEditable() {
		return (
			<FormControl 
				ref='input'
				type={this.props.type?this.props.type:'text'} 
				value={this.props.value}
				defaultValue={this.props.defaultValue}
				onChange={this.onChange.bind(this)}/>
		);
	}

}

export default FormInput;