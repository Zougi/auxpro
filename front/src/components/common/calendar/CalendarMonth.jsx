// react modules
import React from 'react'
// react-bootstrap modules
import { Pager, PageItem, Panel, Grid, Row, Col, Button } from 'react-bootstrap';
// custom components
import CalendarMonthMonth from './CalendarMonthMonth.jsx';
// custom modules
import { MONTHS } from '../../../utils/date/DateConstants.js';
import DateMonth from '../../../utils/date/DateMonth.js';
import DateDay from '../../../utils/date/DateDay.js';

class CalendarMonth extends React.Component {

	constructor(props) {
		super(props);
		this._updateState(props);
	}

	componentWillReceiveProps(props) {
		this._updateState(props);
		this.setState(this.state);
	}

	_updateState(props) {
		this.state = {
			month: new DateMonth({ 
				date: props.day,
				start: 1
			}),
			day: props.day
		}
	}

	_setMonth(month) {
		this.state.month = month;
		this.setState(this.state);
	}

	onPreviousMonth() {
		this._setMonth(this.state.month.previousMonth);
	}
	onNextMonth() {
		this._setMonth(this.state.month.nextMonth);
	}


	render() { return ( 
		<div className='calendar'>
			<Pager>
				<PageItem onClick={this.onPreviousMonth.bind(this)} previous>&larr;</PageItem>
				<Button>{MONTHS[this.state.month.month]} {this.state.day.date.getFullYear()}</Button>
				<PageItem onClick={this.onNextMonth.bind(this)} next>&rarr;</PageItem>
			</Pager>
			<CalendarMonthMonth 
				month={this.state.month} 
				planing={this.props.planing}
				onDaySelect={this.props.onDaySelect}/>
		</div>
    );}
}

export default CalendarMonth;