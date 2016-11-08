import React from 'react';
// Lib modules
import MomentHelper from 'utils/moment/MomentHelper'
import Period from 'utils/constants/Period'
import Day from 'utils/constants/Day'

class InterventionSummaryRecurence extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		let startDate = MomentHelper.localDateToHumanDate(this.props.recurence.startDate);
		let endDate   = MomentHelper.localDateToHumanDate(this.props.recurence.endDate);
		let startTime = MomentHelper.localTimeToHumanTime(this.props.recurence.startTime);
		let endTime   = MomentHelper.localTimeToHumanTime(this.props.recurence.endTime);
		let period    = Period.getPeriod(this.props.recurence.period).value.toLowerCase();
		let sortedDays = this.props.recurence.days.map(function (d) { return Day.getDay(d); }).sort(function (d1, d2) {
			return Day.DAYS.indexOf(d1) - Day.DAYS.indexOf(d2);
		});
		let days = '';
		for (let i = 0 ; i < sortedDays.length ; i++) {
			if (i > 0) {
				days += ', ';
			}
			days += sortedDays[i].value.toLowerCase();
		}
		return (
			<div>
				{'Du ' + startDate + ' au ' + endDate}
				<br/>
				{'Prestation ' + period}
				<br/>
				{'Les ' + days}
				<br/>
				{'De ' + startTime + ' à ' + endTime}
			</div>
		);
	}
}

export default InterventionSummaryRecurence;