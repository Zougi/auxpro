// lib modules
import React from 'react'
import moment from 'moment'
// custom components
import CalendarWeekTime from './CalendarWeekTime.jsx'

import './Calendar.css';

class CalendarWeekDay extends React.Component {

	constructor(props) {
		super(props);
		this.start = props.display.clone().startOf('days').add(8, 'hours');
		this.end = props.display.clone().startOf('days').add(20, 'hours');
		this.interval = moment.duration(30, 'minutes');
	}

	onHourClicked(event) {
		event.preventDefault();
		this.props.onDaySelect(this.props.moment);
	}

	_buildHours() {
		let dayHours = [];
		let planing = this.props.planing.getForDay(this.props.display.year(), this.props.display.month(), this.props.display.date()) || [];
		var current = this.start.clone();
		while (current.isBefore(this.end)) {
			let duration = 1;
			let style = 'default';
			let inPlaning = false;
			let text = '';
			for (let i = 0; i < planing.length; i++) {
				let p = planing[i];
				if (current.isSameOrAfter(p.startDate) && current.isBefore(p.endDate)) {
					inPlaning = true;
					duration = 0;
					while (current.isBefore(p.endDate)) {
						duration++;
						current.add(this.interval);
					}					
					style = p.style;
					text = p.text;
					break;
				}
			}
			if (!inPlaning) {
				current.add(this.interval);
			}
			let hour = {
				hour: current.clone(),
				colSpan: duration,
				style: style,
				text: text
			}
			dayHours.push(hour);
		}
		return dayHours;
	}

	render() { 
		var classes = 'day';
		if (this.props.selected.isSame(this.props.display)) {
			classes += ' selected';
		}
		let timesHours = this._buildHours().map(function(hour) {
			return (
				<CalendarWeekTime 
					key={hour.hour.format()} 
					onClick={this.onHourClicked.bind(this)} 
					moment={hour.hour} 
					colSpan={hour.colSpan}
					text={hour.text}
					bsStyle={hour.style}/>
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
