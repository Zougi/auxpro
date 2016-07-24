// lib modules
import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';
// custom components
import FormButtonGroup from '../../../components-lib/Form/FormButtonGroup.jsx'

class SkillDetails extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<FormButtonGroup 
				static={!this.props.edit}
				title={this.props.title}
				defaultValue={this.props.value}
				values={[ 0, 1, 2, 3, 4, 5 ]}
				onChange={this.props.onChange}/>
		);
	}
}

export default SkillDetails;