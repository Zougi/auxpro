// lib modules
import React from 'react';
import moment from 'moment';
import { Glyphicon, OverlayTrigger } from 'react-bootstrap';
// custom components
import SkillSummaryList from '../skills/SkillSummaryList.jsx'

moment.locale('fr');

class CustomerSummary extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		let age = moment(this.props.data.person.birthDate).toNow(true);
		return (
			<div>
            	{this.props.data.person.firstName} {this.props.data.person.lastName} - {age}
            	<SkillSummaryList skills={this.props.data.skills}/>
	        </div>
		);
	}
}

export default CustomerSummary;