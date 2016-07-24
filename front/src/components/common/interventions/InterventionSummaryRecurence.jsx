import React from 'react';
import moment from 'moment';
import { Panel } from 'react-bootstrap';

import { fromLocalDate, toHumanDate, fromLocalTime, toHumanTime } from '../../../utils/moment/MomentHelper.js'

moment.locale('fr');

class InterventionSummaryRecurence extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		let startDate = fromLocalDate(this.props.recurence.startDate);
		let endDate   = fromLocalDate(this.props.recurence.endDate);
		let startTime = fromLocalTime(this.props.recurence.startDate, this.props.recurence.startTime);
		let endTime   = fromLocalTime(this.props.recurence.startDate, this.props.recurence.endTime);

		console.log(this.props.recurence);

		return (
			<div>
				{'Du ' + toHumanDate(startDate) + ' au ' + toHumanDate(endDate)}
				<br/>
				{'De ' + toHumanTime(startTime) + ' à ' + toHumanTime(endTime)}
			</div>
		);
	}
}

export default InterventionSummaryRecurence;