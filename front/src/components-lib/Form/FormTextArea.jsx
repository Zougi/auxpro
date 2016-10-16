// react modules
import React from 'react'
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
// custom modules
import { DEFAULTS } from './FormConstants.js';
// custom components
import FormBase from './FormBase.jsx'

class FormTextArea extends FormBase {

	constructor(props) {
		super(props);
	}

	onChange(event) {
		var v = event.target.value;
		if (this.props.validator) {
			this.setState({validationState: this.props.validator.getState(v)})
		}
		if (this.props.onChange) {
			this.props.onChange(event.target.value);
		}
	}
	
	getFormControlEditable() {
		return (
			<FormControl 
				ref='input'
				rows={this.props.rows}
				type={this.props.type?this.props.type:'text'} 
				componentClass='textarea'
				value={this.props.value}
				defaultValue={this.props.defaultValue}
				onChange={this.onChange.bind(this)}/>
		);
	}

}

export default FormTextArea;