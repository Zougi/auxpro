// react modules
import React from 'react'
// react-bootstrap modules
import { Pager, PageItem, Panel, Grid, Row, Col, Button } from 'react-bootstrap';
// custom components
import CalendarMonthMonth from '../calendar/CalendarMonthMonth.jsx';
// custom modules
import { MONTHS } from '../../utils/date/DateConstants.js';
import DateMonth from '../../utils/date/DateMonth.js';
import DateDay from '../../utils/date/DateDay.js';

class CalendarMonth extends React.Component {

	constructor(props) {
		super(props);
		var date = new Date();
		this.state = {
			year: date.getFullYear(),
			month: new DateMonth({ 
				date: date,
				start: 1
			}),
			selectedDay: new DateDay(new Date())
		}
	}

	_setMonth(month) {
		this.state.month = month;
		this.state.year = month.year;
		this.setState(this.state);
	}
	_setSelectedDay(day) {
		this.state.selectedDay = day;
		this.setState(this.state);
	}

	onPreviousMonth() {
		this._setMonth(this.state.month.previousMonth);
	}
	onNextMonth() {
		this._setMonth(this.state.month.nextMonth);
	}

	onDaySelect(day) {
		this._setSelectedDay(day);
		this.props.onDaySelect(day);
	}

	render() { return ( 
		<div className='calendar'>
        <Panel header='Planning'>
			<Pager>
				<PageItem onClick={this.onPreviousMonth.bind(this)} previous>&larr;</PageItem>
				<Button>{MONTHS[this.state.month.month]} {this.state.year}</Button>
				<PageItem onClick={this.onNextMonth.bind(this)} next>&rarr;</PageItem>
			</Pager>
			<CalendarMonthMonth 
				month={this.state.month} 
				planing={this.props.planing}
				onDaySelect={this.onDaySelect.bind(this)}/>
		</Panel>
		</div>
    );}
}

export default CalendarMonth;