import React from 'react';

import MomentHelper from '../../../utils/moment/MomentHelper.js'

class InterventionSummaryOneTime extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		let date      = MomentHelper.localDateToHumanDate(this.props.oneTime.date);
		let startTime = MomentHelper.localTimeToHumanTime(this.props.oneTime.startTime);
		let endTime   = MomentHelper.localTimeToHumanTime(this.props.oneTime.endTime);

		return (
			<div>
				{'Le ' + date}
				<br/>
				{'De ' + startTime + ' à ' + endTime}
			</div>
		);
	}
}

export default InterventionSummaryOneTime;