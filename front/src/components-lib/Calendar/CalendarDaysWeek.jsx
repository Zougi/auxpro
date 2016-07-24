
import React from 'react'
import moment from 'moment'

import './Calendar.css';
import CalendarDaysDay from './CalendarDaysDay.jsx';

class CalendarDaysWeek extends React.Component {
	
	constructor(props) {
		super(props);
	}

	_buildDays() {
		return this._buildWeekDays(this.props.moment.startOf('week')).map(function(day) {
			return (
                <CalendarDaysDay 
                	key={day.format()}
                	moment={day}
                	selected={this.props.selected.isSame(day, 'days')}
                	bsSize={this.props.bsSize}
                	notmonth={day.month() !== this.props.month}
                	specialsSuccess={this.props.specialsSuccess}
					specialsInfo={this.props.specialsInfo}
					specialsPrimary={this.props.specialsPrimary}
					specialsWarning={this.props.specialsWarning}
					specialsDanger={this.props.specialsDanger}
                	onDaySelect={this.props.onDaySelect}/>
            );
		}.bind(this));
	}

	_buildWeekDays(weekStart) {
		var days = [];
		for (let i = 0; i < 7; i++) {
			let day = weekStart.clone();
			day.add(i, 'days');
			days.push(day);
		}
		return days;
	}

	render() {
		return (
			<tr className='week'>
				{this._buildDays()}
			</tr>
		);
	}
}

export default CalendarDaysWeek;