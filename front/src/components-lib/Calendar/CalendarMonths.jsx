import React from 'react'
import moment from 'moment'
import { Button } from 'react-bootstrap';

import CalendarMonthsMonth from 'components-lib/Calendar/CalendarMonthsMonth';

import './Calendar.css';

class CalendarMonths extends React.Component {
	
	constructor(props) {
		super(props);
	}

	onYearSelected(event) {
		event.preventDefault();
		if (this.props.onChange) {
			this.props.onChange(this.props.moment);
		}
	}

	render() { 
		return (
			<div>
				<CalendarMonthsMonth name='Janvier'/>
				<CalendarMonthsMonth name='Février'/>
				<CalendarMonthsMonth name='Mars'/>
				<CalendarMonthsMonth name='Avril'/>
				<CalendarMonthsMonth name='Mai'/>
				<CalendarMonthsMonth name='Juin'/>
				<CalendarMonthsMonth name='Juillet'/>
				<CalendarMonthsMonth name='Août'/>
				<CalendarMonthsMonth name='Septembre'/>
				<CalendarMonthsMonth name='Octobre'/>
				<CalendarMonthsMonth name='Novembre'/>
				<CalendarMonthsMonth name='Décembre'/>
			</div>
		);
	}
}

export default CalendarMonths;