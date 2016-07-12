// react modules
import React from 'react'
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
// custom modules
import { DEFAULTS } from './FormConstants.js';
// custom components
import FormBase from './FormBase.jsx'

class FormSelect extends FormBase {

	constructor(props) {
		super(props);
	}

	onChange(event) {
		this.props.onChange(event.target.value);
	}

	getFormControlEditable() {
		let values = this.props.values.map(function(v) {
			return (<option key={v.key} value={v.key}>{v.value}</option>);
		})
		return (
			<FormControl 
				componentClass='select' 
				defaultValue={this.props.defaultValue} 
				onChange={this.onChange.bind(this)}>
    			{values}
  			</FormControl>
		);
	}
}

export default FormSelect;