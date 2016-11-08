// react modules
import React from 'react'
// react-bootstrap modules
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
// custom modules
import { DEFAULTS } from './FormConstants.js';

class FormBase extends React.Component {

	constructor(props) {
		super(props);
		this.state = this._buildState(props);
	}

	componentWillReceiveProps(props) {
		this.setState(this._buildState(props));
	}
	_buildState(props) {
		return {
			xsLabelSize: props.xsLabelSize || DEFAULTS.xsLabelSize,
			smLabelSize: props.smLabelSize || props.xsLabelSize || DEFAULTS.smLabelSize,
			mdLabelSize: props.mdLabelSize || props.smLabelSize || props.xsLabelSize || DEFAULTS.mdLabelSize,
			lgLabelSize: props.lgLabelSize || props.mdLabelSize || props.smLabelSize || props.xsLabelSize || DEFAULTS.lgLabelSize,
			validationState: props.validator ? props.validator.getState(props.defaultValue || props.value) : props.validationState,
			value: props.value
		}
	}

	getFormControl() {
		if (this.props.edit) {
			return this.getFormControlEditable();
		} else {
			return this.getFormControlStatic();	
		}
	}

	getFormControlStatic() {
		return (
			<FormControl.Static>
				{this.props.defaultValue || this.props.value}
			</FormControl.Static>
		);
	}

	render() { 
		return (
			<FormGroup validationState={this.state.validationState}>
				<Col componentClass={ControlLabel} sm={this.state.smLabelSize} md={this.state.mdLabelSize} lg={this.state.lgLabelSize}>
					{this.props.title}
				</Col>
				<Col sm={12 - this.state.smLabelSize} md={12 - this.state.mdLabelSize} lg={12 - this.state.lgLabelSize}>
					{this.props.children ? this.props.children : this.getFormControl()}
					<FormControl.Feedback/>
				</Col>
			</FormGroup>
		);
	}
}

export default FormBase;