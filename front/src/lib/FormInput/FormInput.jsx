import React from 'react'

import { Base } from '../Lib.jsx';

class FormInput extends React.Component {

	constructor(props) {
		super(props);
		this.formGroupProps = {className:"form-group"};
		this.controlLabelProps = {className:"control-label"};
		this.formControlProps = {className:"form-control"};
		this.buildProps();
	}

	buildProps() {
		this.buildOneProps(this.props, 'id', this.formControlProps, 'id');
		this.buildOneProps(this.props, 'type', this.formControlProps, 'type');
		this.buildOneProps(this.props, 'placeholder', this.formControlProps, 'placeholder');
		this.buildOneProps(this.props, 'defaultValue', this.formControlProps, 'defaultValue');
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
			return (<div {...this.controlLabelProps} >{this.props.label}</div>)
		}
	}
	
	getFormControl() {
		return (
			<input
				{...this.formControlProps}
				onChange={this.onChange.bind(this)}
			/>
		)
	}
	
	getFormGroup() {
		return (
			<div {...this.formGroupProps}>
				{this.getLabel()}
				{this.getFormControl()}
			</div>
		);
	}
	
	render() {
		return (this.getFormGroup());
	}
}

export default FormInput;