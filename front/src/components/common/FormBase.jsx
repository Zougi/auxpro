// react modules
import React from 'react'
// react-bootstrap modules
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';

class FormBase extends React.Component {

	constructor(props) {
		super(props);
	}

	render() { 
		return (
			<FormGroup>
				<Col componentClass={ControlLabel} sm={2}>
					{this.props.title}
				</Col>
				<Col sm={10}>
					<FormControl type={this.props.type?this.props.type:'text'} defaultValue={this.props.defaultValue} onChange={this.props.onChange}/>
				</Col>
			</FormGroup>
		);
	}
}

export default FormBase;