// react modules
import React from 'react'
// react-bootstrap modules
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';

class FormBase extends React.Component {

	constructor(props) {
		super(props);
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
				<Col componentClass={ControlLabel} sm={this.props.labelSize?this.props.labelSize:2}>
					{this.props.title}
				</Col>
				<Col sm={this.props.labelSize?12-this.props.labelSize:10}>
					{this._getFormControl()}
				</Col>
			</FormGroup>
		);
	}
}

export default FormBase;