import React from 'react'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import { DEFAULTS } from './FormConstants.js';

class IFormInput extends React.Component {

	constructor(props) {
		super(props);
		this.formGroupProps = {};
		this.controlLabel = {};
		this.formControl = {};
		this.buildProps();
	}

	buildProps() {
		this.buildOneProps(this.props, 'id', this.formGroupProps, 'controlId');
		this.buildOneProps(this.props, 'type', this.formControl, 'type');
		this.buildOneProps(this.props, 'placeholder', this.formControl, 'placeholder');
		this.buildOneProps(this.props, 'defaultValue', this.formControl, 'defaultValue');
	}
	
	buildOneProps(props, propsKey, propsStore, newPropsKey) {
		if (props[propsKey]) {
			propsStore[newPropsKey] = props[propsKey];
		}
	}
	
	onChange(event) {
		this.props.onChange(this.props.name, event.target.value, event);
	}
		
	getLabel() {
		if (this.props.label) {
			return (<ControlLabel>{this.props.label}</ControlLabel>)
		}
	}
	
	getFormControl() {
		return (
			<FormControl
				{...this.formControl}
				onChange={this.onChange.bind(this)}
			/>
		)
	}
	
	getFormGroup() {
		return (
			<FormGroup {...this.formGroupProps}>
				{this.getLabel()}
				{this.getFormControl()}
			</FormGroup>
		);
	}
	
	render() {
		return (this.getFormGroup());
	}
}

export default IFormInput;