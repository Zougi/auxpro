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
		var v = event.target.value;
		if (this.props.validator) {
			this.setState({validationState: this.props.validator.getState(v)})
		}
		if (this.props.onChange) {
			this.props.onChange(v);
		}
	}
	
	getFormControlEditable() {
		return (
			<FormControl 
				ref={(c) => this.input = c}
				type={this.props.type?this.props.type:'text'} 
				value={this.state.value}
				placeholder={this.props.placeholder}
				defaultValue={this.props.defaultValue}
				onChange={this.onChange.bind(this)}/>
		);
	}

}

export default FormInput;