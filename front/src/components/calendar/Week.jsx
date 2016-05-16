// react modules
import React from 'react'
// custom components
import Day from './Day.jsx';
// custom modules
import DAYS_SHORT from '../../utils/date/DateConstants.js';

class Week extends React.Component {
	
	constructor(props) {
		super(props);
	}
	onDaySelect(day) {
		this.props.onDaySelect(day);
	}
	render() {
		var month = this.props.month;
		var days = this.props.week.days.map(function(day) {
            return (
                <Day 
                	key={day.id}
                	month={month}
                	day={day}
                	planing={this.props.planing.getForDay(day.date.getFullYear(), day.date.getMonth(), day.date.getDate())}
                	onDaySelect={this.onDaySelect.bind(this)}/>
            );
        }.bind(this));
		return (
			<tr>{days}</tr>
		);
	}
}

export default Week;