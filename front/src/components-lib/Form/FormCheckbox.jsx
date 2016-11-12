import React from 'react'
import { FormControl, Checkbox } from 'react-bootstrap'

import FormBase from 'components-lib/Form/FormBase.jsx'

class FormCheckbox extends FormBase {

	constructor(props) {
		super(props);
	}

	onChange(event) {
		if (this.props.onChange) {
			this.props.onChange(event.target.checked);
		}
	}

	getFormControlStatic() {
		return (
			 <Checkbox defaultChecked={this.props.defaultValue} readOnly/>
		);
	}

	getFormControlEditable() {
		return (
			<Checkbox 
				defaultChecked={this.props.defaultValue}
				onChange={this.onChange.bind(this)}>
			</Checkbox>
		);
	}
}

export default FormCheckbox;