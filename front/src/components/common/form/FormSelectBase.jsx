// react modules
import React from 'react'
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
// custom modules
import { DEFAULTS } from './FormConstants.js';

class FormSelectBase extends React.Component {

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
			let values = this.props.values.map(function(v) {
				return (<option key={v} value={v}>{v}</option>);
			})
			return (
				<FormControl componentClass='select' defaultValue={this.props.defaultValue}>
        			{values}
      			</FormControl>
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

export default FormSelectBase;