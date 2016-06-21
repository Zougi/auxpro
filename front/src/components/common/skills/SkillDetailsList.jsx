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
		this.state = {
			skills: this.props.skills || {}
		}
	}

	changeHandler(skill) {
		return function (v) {
			this.state.skills[skill.field] = v;
			this.props.onChange(this.state.skills);
		}.bind(this);
	}

	render() {
		let skills = SKILLS.map(function(skill) {
			return (
				<SkillDetails 
					edit={this.props.edit}
		           	key={skill.field}
		           	icon={skill.icon}
		           	title={skill.title}
		           	value={this.state.skills[skill.field] || 0}
		           	onChange={this.changeHandler(skill)}/>
		       );
		}.bind(this));

		return (
			<Col className='SkillDetailsList'>
				{skills}
			</Col>
		);
	}
}

export default SkillDetailsList;