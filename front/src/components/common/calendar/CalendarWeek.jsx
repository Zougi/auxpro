// lib modules
import React from 'react'
import moment from 'moment'
import { Pager, PageItem, Button } from 'react-bootstrap';
// custom components
import CalendarWeekWeek from './CalendarWeekWeek.jsx';


class CalendarWeek extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			moment: this.props.selected.startOf('weeks')
		}
	}

	setPreviousWeek() {
		this.state.moment.subtract(1, 'weeks');
		this.setState(this.state);
	}
	setNextWeek() {
		this.state.moment.add(1, 'weeks');
		this.setState(this.state);
	}

	render() { return ( 
		<div>
			<Pager>
				<PageItem onClick={this.setPreviousWeek.bind(this)} previous>&larr;</PageItem>
				<Button>{this.props.selected.format('dddd Do MMMM YYYY')}</Button>
				<PageItem onClick={this.setNextWeek.bind(this)} next>&rarr;</PageItem>
			</Pager>
			<CalendarWeekWeek
				moment={this.state.moment}
				selected={this.props.selected}
				onDaySelect={this.props.onDaySelect}/>
		</div>
    );}
}

export default CalendarWeek;