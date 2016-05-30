// react modules
import React from 'react'
// react-bootstrap modules
import { Pager, PageItem, Panel, Grid, Row, Col, Button } from 'react-bootstrap';
// custom components
import CalendarWeekWeek from '../calendar/CalendarWeekWeek.jsx';
// custom modules
import DateWeek from '../../utils/date/DateWeek.js';
import { D } from '../../utils/date/DateConstants.js';


class CalendarWeek extends React.Component {

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
			week: new DateWeek({ 
				date: props.day,
				start: 1
			}),
			day: props.day
		}
	}

	setPreviousWeek() {
		this.props.onDaySelect(this.state.day.getDayInDays(-7));
	}
	setNextWeek() {
		this.props.onDaySelect(this.state.day.getDayInDays(7));
	}

	render() { return ( 
		<div>
			<Pager>
				<PageItem onClick={this.setPreviousWeek.bind(this)} previous>&larr;</PageItem>
				<Button>{this.state.day.value}</Button>
				<PageItem onClick={this.setNextWeek.bind(this)} next>&rarr;</PageItem>
			</Pager>
			<CalendarWeekWeek
				day={this.state.day}
				week={this.state.week}
				planing={this.props.planing}
				onDaySelect={this.props.onDaySelect}/>
		</div>
    );}
}

export default CalendarWeek;