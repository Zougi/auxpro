import React from 'react'
import { Row, Col, Glyphicon } from 'react-bootstrap'
// Custom components
import FormButtonGroup from 'components-lib/Form/FormButtonGroup'

class SkillDetails extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<FormButtonGroup 
				edit={this.props.edit}
				title={this.props.title}
				defaultValue={this.props.value}
				values={[ 0, 1, 2, 3, 4, 5 ]}
				onChange={this.props.onChange}/>
		);
	}
}

export default SkillDetails;