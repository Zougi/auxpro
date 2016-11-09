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
		event.preventDefault();
		var v = event.target.value;
		var vs = 'success';
		if (this.props.validator) {
			v = this.props.validator.getBlockedValue(v);
			event.target.value = v;
			vs = this.props.validator.getState(v);
			this.setState({ validationState: vs })
		}
		if (this.props.onChange) {
			this.props.onChange({
				value: v,
				validationState: vs
			});
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