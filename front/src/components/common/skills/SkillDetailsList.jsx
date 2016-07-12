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
		this.state = {}
	}

	changeHandler(skill) {
		return function (v) {
			this.state[skill.field] = v;
			this.props.onChange({
				housework: this.state.housework || (this.props.skills ? this.props.skills.housework : 0),
				childhood: this.state.childhood || (this.props.skills ? this.props.skills.childhood : 0),
				shopping: this.state.shopping || (this.props.skills ? this.props.skills.shopping : 0),
				nursing: this.state.nursing || (this.props.skills ? this.props.skills.nursing : 0),
				compagny: this.state.compagny || (this.props.skills ? this.props.skills.compagny : 0),
				administrative: this.state.administrative || (this.props.skills ? this.props.skills.administrative : 0),
				doityourself: this.state.doityourself || (this.props.skills ? this.props.skills.doityourself : 0)
			});
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
		           	value={this.props.skills ? this.props.skills[skill.field] : 0}
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