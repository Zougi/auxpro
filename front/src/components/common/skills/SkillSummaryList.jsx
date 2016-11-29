import React from 'react'
import { Glyphicon, OverlayTrigger } from 'react-bootstrap'
// custom modules
import { SKILLS } from './SkillData'
// custom components
import SkillSummary from './SkillSummary'

class SkillSummaryList extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		let skills = [];
		if (this.props.skills) {
			skills = SKILLS.map(function(skill) {
				return (
					<SkillSummary 
		            	key={skill.field}
		            	icon={skill.icon}
		            	title={skill.title}
		            	value={this.props.skills[skill.field]}/>
		        );
			}.bind(this));
		}

		return (
			<div className='SkillSummaryList'>
				{skills}
			</div>
		);
	}
}
export default SkillSummaryList;