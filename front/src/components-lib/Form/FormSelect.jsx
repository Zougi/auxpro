import React from 'react'
import { FormControl } from 'react-bootstrap';

import FormBase from './FormBase.jsx'

class FormSelect extends FormBase {

	constructor(props) {
		super(props);
	}

	onChange(event) {
		if (this.props.onChange) {
			this.props.onChange(event.target.value);
		}
	}

	_buildValues() {
		return this.props.values.map(function(v) {
			return (<option key={v.key} value={v.key}>{v.value}</option>);
		});
	}

	getFormControlStatic() {
		let value = this.props.defaultValue || this.props.value;
		let l = (this.props.values || []).length;
		for (let i = 0; i < l; i++) {
			let v = this.props.values[i];
			if (v.key === this.props.defaultValue || v.key === this.props.value) {
				value = v.value;
				break;
			}
		}
		return (
			<FormControl.Static>
				{value}
			</FormControl.Static>
		);
	}

	getFormControlEditable() {
		return (
			<FormControl 
				componentClass='select' 
				defaultValue={this.props.defaultValue} 
				onChange={this.onChange.bind(this)}>
    			{this._buildValues()}
  			</FormControl>
		);
	}
}

export default FormSelect;