import React from 'react'
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap'
// Custom components
import { DEFAULTS } from 'components-lib/Form/FormConstants'
import FormBase from 'components-lib/Form/FormBase'
import GoogleAutocomplete from 'components-lib/Map/GoogleAutocomplete'

class FormGoogleAutocomplete extends FormBase {

	constructor(props) {
		super(props);
		this.xsLabelSize = 0;
		this.smLabelSize = 1;
		this.mdLabelSize = 1;
		this.lgLabelSize = 1;
	}

	onChange(address) {
		if (this.props.validator) {
			this.setState({validationState: this.props.validator.getState(address)})
		}
		if (this.props.onChange) {
			this.props.onChange(address);
		}
	}
	
	getFormControlEditable() {
		return (
			<GoogleAutocomplete 
				edit={true}
				placeholder={this.props.placeholder}
				defaultValue={this.props.defaultValue}
				onChange={this.onChange.bind(this)} />
		);
	}

}

export default FormGoogleAutocomplete;