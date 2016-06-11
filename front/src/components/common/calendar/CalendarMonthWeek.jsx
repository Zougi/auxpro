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
		var days = this._buildDays(this.props.display.startOf('week')).map(function(day) {
			let planing = this.props.planing.getForDay(day.year(), day.month(), day.date()) || [];
			let bsStyle = null;
			for (let i = 0; i < planing.length; i++) {
				let p = planing[i];
				if (p.style === 'info') {
					bsStyle = p.style;
					break;
				} else {
					bsStyle = p.style;
				}
			}
            return (
                <CalendarMonthDay 
                	key={day.format()}
                	display={day}
                	selected={this.props.selected.isSame(day, 'days')}
                	bsStyle={bsStyle}
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