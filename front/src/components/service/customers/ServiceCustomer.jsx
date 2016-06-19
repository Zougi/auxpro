// lib modules
import React from 'react';
import moment from 'moment';
import { Glyphicon, OverlayTrigger } from 'react-bootstrap';
// custom components
import SkillsShort from '../../common/skills/SkillsShort.jsx'

moment.locale('fr');

class ServiceCustomer extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		let age = moment(this.props.data.person.birthDate).toNow(true);
		return (
			<div>
            	{this.props.data.person.firstName} {this.props.data.person.lastName} - {age}
            	<SkillsShort skills={this.props.data.skills}/>
	        </div>
		);
	}
}

export default ServiceCustomer;