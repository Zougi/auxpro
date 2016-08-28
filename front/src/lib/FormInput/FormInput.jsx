import React from 'react'
import Base from '../Base.jsx';

class FormInput extends Base {

	constructor(props) {
		super(props);
		this.formGroupProps = {};
		this.controlLabelProps = {};
		this.formControlProps = {};
		this.buildProps();
	}

	buildProps() {
		this.formGroupProps.className = "form-group";
		
		this.controlLabelProps.className = "control-label";
		
		this.formControlProps.className = "form-control";
		this.formControlProps.onChange = this.onChange.bind(this);
		this.copyFromObj(this.props, 'id', this.formControlProps);
		this.copyFromObj(this.props, 'type', this.formControlProps);
		this.copyFromObj(this.props, 'placeholder', this.formControlProps);
		this.copyFromObj(this.props, 'defaultValue', this.formControlProps);
	}
	
	onChange(event) {
		if  (this.props.onChange)
			this.props.onChange(this.props.name, event.target.value, event);
	}
		
	getLabel() {
		if (this.props.label) {
			return (
				<div {...this.controlLabelProps} >
					{this.props.label}
				</div>)
		}
	}
	
	getFormControl() {
		return (
			<input {...this.formControlProps} />
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