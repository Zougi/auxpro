import React from 'react'
import moment from 'moment'
import { Table } from 'react-bootstrap';

import './Calendar.css';
import CalendarDaysWeek from './CalendarDaysWeek.jsx';

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

class CalendarDaysMonth extends React.Component {
	
	constructor(props) {
		super(props);
	}

	_buildHeaders() {
		return DAYS.map(function(day) {
			return (
				<th key={day.format()}>{day.format(DAY_FORMAT)}</th>
			);
		});
	}

	_buildWeeks() {
		return this._buildMonthWeeks(this.props.moment.startOf('month')).map(function(week) {
            return (
                <CalendarDaysWeek 
                	key={week.format()} 
                	moment={week}
                	selected={this.props.selected}
                	month={this.props.moment.month()}
                	bsSize={this.props.bsSize}
                	planing={this.props.planing}
                	specialsSuccess={this.props.specialsSuccess}
					specialsInfo={this.props.specialsInfo}
					specialsPrimary={this.props.specialsPrimary}
					specialsWarning={this.props.specialsWarning}
					specialsDanger={this.props.specialsDanger}
                	onDaySelect={this.props.onDaySelect}/>
            );
        }.bind(this));
	}

	_buildMonthWeeks(moment) {
		var weeks = [];
		for (let i = 0; i < 6; i++) {
			let week = moment.clone();
			week.add(i, 'week')
			weeks.push(week);
		}
		return weeks;
	}

	render() { 
		return (
			<Table className='month' condensed responsive>
	            <thead>
	                <tr>
	                	{this._buildHeaders()}
	                </tr>
	            </thead>
	            <tbody>
	            	{this._buildWeeks()}
	            </tbody>
	        </Table>
		);
	}
}

export default CalendarDaysMonth;