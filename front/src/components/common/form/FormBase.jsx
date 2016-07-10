// react modules
import React from 'react'
// react-bootstrap modules
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
// custom modules
import { DEFAULTS } from './FormConstants.js';

class FormBase extends React.Component {

	constructor(props) {
		super(props);
		this.xsLabelSize = this.props.xsLabelSize || DEFAULTS.xsLabelSize;
		this.smLabelSize = this.props.smLabelSize || DEFAULTS.smLabelSize;
		this.mdLabelSize = this.props.mdLabelSize || DEFAULTS.mdLabelSize;
		this.lgLabelSize = this.props.lgLabelSize || DEFAULTS.lgLabelSize;
	}

	getFormControl() {
		if (this.props.static) {
			return this.getFormControlStatic();	
		} else {
			return this.getFormControlEditable();
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
			<FormGroup>
				<Col componentClass={ControlLabel} sm={this.smLabelSize} md={this.mdLabelSize} lg={this.lgLabelSize}>
					{this.props.title}
				</Col>
				<Col sm={12 - this.smLabelSize} md={12 - this.mdLabelSize} lg={12 - this.lgLabelSize}>
					{this.getFormControl()}
				</Col>
			</FormGroup>
		);
	}
}

export default FormBase;