// react modules
import React from 'react'
// react-bootstrap modules
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
// custom modules
import { DEFAULTS } from './FormConstants.js';

class FormInputBase extends React.Component {

	constructor(props) {
		super(props);
		this.smLabelSize = this.props.smLabelSize || DEFAULTS.smLabelSize;
		this.mdLabelSize = this.props.mdLabelSize || DEFAULTS.mdLabelSize;
		this.lgLabelSize = this.props.lgLabelSize || DEFAULTS.lgLabelSize;
	}

	_getFormControl() {
		if (this.props.static) {
			return (
				<FormControl.Static>
					{this.props.defaultValue}
				</FormControl.Static>
			);
		} else {
			return (
				<FormControl 
					type={this.props.type?this.props.type:'text'} 
					defaultValue={this.props.defaultValue} 
					onChange={this.props.onChange}/>
			);
		}
	}

	render() { 
		return (
			<FormGroup>
				<Col componentClass={ControlLabel} sm={this.smLabelSize} md={this.mdLabelSize} lg={this.lgLabelSize}>
					{this.props.title}
				</Col>
				<Col sm={12 - this.smLabelSize} md={12 - this.mdLabelSize} lg={12 - this.lgLabelSize}>
					{this._getFormControl()}
				</Col>
			</FormGroup>
		);
	}
}

export default FormInputBase;