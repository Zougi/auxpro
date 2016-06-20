// lib modules
import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';
// custom components
import FormBase from '../FormBase.jsx'

class SkillDetails extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		let tooltip = (
 			<Tooltip id="tooltip">{this.props.title}</Tooltip>
		);

		return (
			<FormBase 
				static={!this.props.edit}
				title='this.props.title' 
				labelSize={this.props.labelSize ? this.props.labelSize : LS}
				defaultValue={this.props.value}/>
		);
	}
}

export default SkillDetails;