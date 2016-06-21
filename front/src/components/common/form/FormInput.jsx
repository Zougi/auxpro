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

	getFormControlEditable() {
		return (
			<FormControl 
				type={this.props.type?this.props.type:'text'} 
				defaultValue={this.props.defaultValue} 
				onChange={this.props.onChange}/>
		);
	}

}

export default FormInput;