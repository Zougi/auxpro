// lib modules
import React from 'react'
import moment from 'moment'
import { Pager, PageItem, Panel, Grid, Row, Col, Button } from 'react-bootstrap';
// custom components
import CalendarMonthMonth from './CalendarMonthMonth.jsx';

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
			moment: moment(),
			selected: moment()
		}
	}

	_setMonth(month) {
		this.state.moment = month;
		this.setState(this.state);
	}
	onPreviousMonth() {
		var month = this.state.moment.clone();
		this._setMonth(month.subtract(1, 'month'));
	}
	onNextMonth() {
		var month = this.state.moment.clone();
		this._setMonth(month.add(1, 'month'));
	}


	render() { return ( 
		<div className='calendar-month'>
			<Pager>
				<PageItem onClick={this.onPreviousMonth.bind(this)} previous>&larr;</PageItem>
				<Button>{this.state.moment.format('MMMM')} {this.state.moment.format('YYYY')}</Button>
				<PageItem onClick={this.onNextMonth.bind(this)} next>&rarr;</PageItem>
			</Pager>
			<CalendarMonthMonth 
				moment={this.state.moment} 
				selected={this.state.selected}
				planing={this.props.planing}
				onDaySelect={this.props.onDaySelect}/>
		</div>
    );}
}

export default CalendarMonth;