// lib modules
import React from 'react'
import moment from 'moment'
import { Table } from 'react-bootstrap';
// custom components
import CalendarMonthWeek from './CalendarMonthWeek.jsx';

moment.locale('fr');

let DAYS = [
	moment().startOf('week'),
	moment().startOf('week').add(1, 'days'),
	moment().startOf('week').add(2, 'days'),
	moment().startOf('week').add(3, 'days'),
	moment().startOf('week').add(4, 'days'),
	moment().startOf('week').add(5, 'days'),
	moment().startOf('week').add(6, 'days')
];

let DAY_FORMAT = 'dd';

class CalendarMonthMonth extends React.Component {
	
	constructor(props) {
		super(props);
	}

	_buildWeeks(monthStart) {
		var weeks = [];
		for (let i = 0; i < 6; i++) {
			let week = monthStart.clone();
			week.add(i, 'week')
			weeks.push(week);
		}
		return weeks;
	}

	render() { 
		let headers = DAYS.map(function(day) {
			return (
				<th key={day.format()} className='center'>{day.format(DAY_FORMAT)}</th>
			);
		});
		let weeks = this._buildWeeks(this.props.display.startOf('month')).map(function(week) {
            return (
                <CalendarMonthWeek 
                	key={week.format()} 
                	display={week}
                	selected={this.props.selected}
                	month={this.props.display.month()}
                	bsSize={this.props.bsSize}
                	planing={this.props.planing}
                	onDaySelect={this.props.onDaySelect}/>
            );
        }.bind(this));
		return (
			<Table condensed responsive>
	            <thead>
	                <tr>
	                	{headers}
	                </tr>
	            </thead>
	            <tbody>
	            	{weeks}
	            </tbody>
	        </Table>
		);
	}
}

export default CalendarMonthMonth;