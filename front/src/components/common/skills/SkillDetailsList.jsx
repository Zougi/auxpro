// lib modules
import React from 'react';
import { Col } from 'react-bootstrap';
// custom modules
import { SKILLS } from './SkillData.js'
// custom components
import SkillDetails from './SkillDetails.jsx'

class SkillDetailsList extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		let skills = [];
		if (this.props.skills) {
			skills = SKILLS.map(function(skill) {
				return (
					<SkillDetails 
		            	key={skill.field}
		            	icon={skill.icon}
		            	title={skill.title}
		            	value={this.props.skills[skill.field]}/>
		        );
			}.bind(this));
		}

		return (
			<Col className='SkillDetailsList'>
				{skills}
			</Col>
		);
	}
}

export default SkillDetailsList;