// lib modules
import React from 'react';
import { Glyphicon, OverlayTrigger } from 'react-bootstrap';
// custom modules
import { SKILLS } from './Skills.js'
// custom components
import SkillShort from './SkillShort.jsx'

class SkillsShort extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		let skills = [];
		if (this.props.skills) {
			skills = SKILLS.map(function(skill) {
				return (
					<SkillShort 
		            	key={skill.field}
		            	icon={skill.icon}
		            	title={skill.title}
		            	value={this.props.skills[skill.field]}/>
		        );
			}.bind(this));
		}

		return (
			<div className='SkillsShort'>
				{skills}
			</div>
		);
	}
}

export default SkillsShort;