// react modules
import React from 'react'
// react-bootstrap modules
import { Pager, PageItem, Panel, Grid, Row, Col, Button } from 'react-bootstrap';
// custom components
import Month from '../calendar/Month.jsx';
// custom modules
import { MONTHS } from '../../utils/date/DateConstants.js';
import DateMonth from '../../utils/date/DateMonth.js';

class Calendar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			month: new DateMonth({ 
				date: new Date(2016, 9, 15),
				start: 1
			})
		}
	}

	onPreviousMonth() {
		console.log(this.state);
		let month = this.state.month.previousMonth; 
		console.log(month);
		this.setState({
			month: month
		});
	}

	onNextMonth() {
		this.setState({
			month: this.state.month.nextMonth
		});
	}

	render() { return (
		<div className='calendar'>
        <Panel>
			<Pager>
				<PageItem onClick={this.onPreviousMonth.bind(this)} previous>&larr;</PageItem>
				<Button>{MONTHS[this.state.month.month]} {this.state.month.year}</Button>
				<PageItem onClick={this.onNextMonth.bind(this)} next>&rarr;</PageItem>
				</Pager>
			<Month month={this.state.month}/>
		</Panel>
		</div>
    );}
}

export default Calendar;