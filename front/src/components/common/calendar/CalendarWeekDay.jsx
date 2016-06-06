// lib modules
import React from 'react'
import moment from 'moment'
// custom components
import CalendarWeekTime from './CalendarWeekTime.jsx'

class CalendarWeekDay extends React.Component {

	constructor(props) {
		super(props);
		this.start = props.moment.clone().startOf('days').add(8, 'hours');
		this.end = props.moment.clone().startOf('days').add(20, 'hours');
		this.interval = moment.duration(30, 'minutes');
	}

	onHourClicked(event) {
		event.preventDefault();
		this.props.onDaySelect(this.props.moment);
	}

	_buildHours() {
		let dayHours = [];
		var current = this.start.clone();
		while (current.isBefore(this.end)) {
			let hour = current.clone();
			dayHours.push(hour);
			current.add(this.interval);
		}
		return dayHours;
	}

	render() { 
		var classes = 'day';
		if (this.props.selected) {
			classes += ' selected';
		}
		let timesHours = this._buildHours().map(function(hour) {
			return (
				<CalendarWeekTime key={hour.format()} onClick={this.onHourClicked.bind(this)} moment={hour}/>
			);
		}.bind(this));

		return (
		<tr className={classes}>
			<td className='hour'><p/></td>
			{timesHours}
			<td className='hour'><p/></td>
		</tr>
		);
	}
} 

export default CalendarWeekDay;