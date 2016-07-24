import React from 'react';

import MomentHelper from '../../../utils/moment/MomentHelper.js'

class InterventionSummaryRecurence extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		let startDate = MomentHelper.localDateToHumanDate(this.props.recurence.startDate);
		let endDate   = MomentHelper.localDateToHumanDate(this.props.recurence.endDate);
		let startTime = MomentHelper.localTimeToHumanTime(this.props.recurence.startTime);
		let endTime   = MomentHelper.localTimeToHumanTime(this.props.recurence.endTime);

		return (
			<div>
				{'Du ' + startDate + ' au ' + endDate}
				<br/>
				{'De ' + startTime + ' à ' + endTime}
			</div>
		);
	}
}

export default InterventionSummaryRecurence;