// lib modules
import React from 'react'
import moment from 'moment'
// custom components
import CalendarMonthDay from './CalendarMonthDay.jsx';

class CalendarMonthWeek extends React.Component {
	
	constructor(props) {
		super(props);
	}

	_buildDays(weekStart) {
		var days = [];
		for (let i = 0; i < 7; i++) {
			let day = weekStart.clone();
			day.add(i, 'days');
			days.push(day);
		}
		return days;
	}

	render() {
		//bsSize bsStyle past notmonth selected
		var days = this._buildDays(this.props.moment.startOf('week')).map(function(day) {
            return (
                <CalendarMonthDay 
                	key={day.format()}
                	moment={day}
                	selected={this.props.selected.isSame(day, 'days')}
                	notmonth={day.month() !== this.props.month}
                	onDaySelect={this.props.onDaySelect}/>
            );
        }.bind(this));
		return (
			<tr>{days}</tr>
		);
	}
}

export default CalendarMonthWeek;