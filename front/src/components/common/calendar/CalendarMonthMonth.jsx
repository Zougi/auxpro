// react modules
import React from 'react'
// react-bootstrap modules
import { Table } from 'react-bootstrap';
// custom components
import CalendarMonthWeek from './CalendarMonthWeek.jsx';
// custom modules
import { DAYS_SHORT } from '../../../utils/date/DateConstants.js';

class CalendarMonthMonth extends React.Component {
	
	constructor(props) {
		super(props);
	}
	onDaySelect(day) {
		this.props.onDaySelect(day);
	}
	render() { 
		var month = this.props.month.month;
		var weeks = this.props.month.weeks.map(function(week) {
            return (
                <CalendarMonthWeek 
                	key={week.id} 
                	month={month} 
                	week={week} 
                	planing={this.props.planing}
                	onDaySelect={this.onDaySelect.bind(this)}/>
            );
        }.bind(this));
		return (
			<Table condensed responsive>
	            <thead>
	                <tr>
	                	<th className='center'>{DAYS_SHORT[1]}</th>
	                	<th className='center'>{DAYS_SHORT[2]}</th> 
	                	<th className='center'>{DAYS_SHORT[3]}</th>
	                	<th className='center'>{DAYS_SHORT[4]}</th>
	                	<th className='center'>{DAYS_SHORT[5]}</th>
	                	<th className='center'>{DAYS_SHORT[6]}</th>
	                	<th className='center'>{DAYS_SHORT[0]}</th>
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