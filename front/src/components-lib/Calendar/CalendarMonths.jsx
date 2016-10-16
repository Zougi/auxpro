import React from 'react'

import CalendarMonthsMonth from 'components-lib/Calendar/CalendarMonthsMonth';

import './Calendar.css';

class CalendarMonths extends React.Component {
	
	constructor(props) {
		super(props);
	}

	onMonthSelected(month) {
		return function (event) {
			if (this.props.onMonthSelect) {
				this.props.onMonthSelect(month);
			}
		}.bind(this);
	}

	render() { 
		return (
			<div>
				<CalendarMonthsMonth onSelect={this.onMonthSelected(0)} name='Janvier'/>
				<CalendarMonthsMonth onSelect={this.onMonthSelected(1)} name='Février'/>
				<CalendarMonthsMonth onSelect={this.onMonthSelected(2)} name='Mars'/>
				<CalendarMonthsMonth onSelect={this.onMonthSelected(3)} name='Avril'/>
				<CalendarMonthsMonth onSelect={this.onMonthSelected(4)} name='Mai'/>
				<CalendarMonthsMonth onSelect={this.onMonthSelected(5)} name='Juin'/>
				<CalendarMonthsMonth onSelect={this.onMonthSelected(6)} name='Juillet'/>
				<CalendarMonthsMonth onSelect={this.onMonthSelected(7)} name='Août'/>
				<CalendarMonthsMonth onSelect={this.onMonthSelected(8)} name='Septembre'/>
				<CalendarMonthsMonth onSelect={this.onMonthSelected(9)} name='Octobre'/>
				<CalendarMonthsMonth onSelect={this.onMonthSelected(10)} name='Novembre'/>
				<CalendarMonthsMonth onSelect={this.onMonthSelected(11)} name='Décembre'/>
			</div>
		);
	}
}

export default CalendarMonths;