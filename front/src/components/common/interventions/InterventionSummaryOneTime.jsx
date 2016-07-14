import React from 'react';
import moment from 'moment';
import { Panel } from 'react-bootstrap';

import { fromLocalDate, toHumanDate, fromLocalTime, toHumanTime } from '../../../utils/moment/MomentHelper.js'

moment.locale('fr');

class InterventionSummaryOneTime extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		let date = fromLocalDate(this.props.oneTime.date);
		let start = fromLocalTime(this.props.oneTime.date, this.props.oneTime.startTime);
		let end = fromLocalTime(this.props.oneTime.date, this.props.oneTime.endTime);

		return (
			<div>
				{'Le ' + toHumanDate(date)}
				<br/>
				{'De ' + toHumanTime(start) + ' à ' + toHumanTime(end)}
			</div>
		);
	}
}

export default InterventionSummaryOneTime;