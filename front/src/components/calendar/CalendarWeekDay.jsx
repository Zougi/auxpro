// react modules
import React from 'react'
// react-bootstrap modules
import { Pager, PageItem, Table, Panel, Grid, Row, Col, Button } from 'react-bootstrap';
// react-router-bootstrap moduls
import { LinkContainer } from 'react-router-bootstrap'

// custom components
import Calendar from '../calendar/Calendar.jsx';
import Month from '../calendar/Month.jsx';
import Week from '../calendar/Week.jsx';
import Day from '../calendar/Day.jsx';
// custom modules
import { MONTHS } from '../../utils/date/DateConstants.js';
import DateMonth from '../../utils/date/DateMonth.js';
import DateWeek from '../../utils/date/DateWeek.js';

class CalendarWeekDay extends React.Component {

	constructor(props) {
		super(props);
	}

	render() { 

		let times = [
			'08h', '08h30', '09h', '09h30', '10h', '10h30', '11h', '11h30', '12h', '12h30', '13h', '13h30', 
			'14h', '14h30', '15h', '15h30', '16h', '16h30', '17h', '17h30', '18h', '18h30', '19h', '19h30',
			'20h'
		];

		let timesHours = this.props.times.map(function(time) {
			if (time.indexOf('h30') === -1) {
				return (<td key={time} className="hour"><p/></td>);
			} else {
				return (<td key={time} className="hour start"><p/></td>);
			}
		});

		return (
		<table style={{width:"100%"}} className="calendar-week">
			<tbody>
				<tr>
					<td className="hour-b"><p/></td>
					{timesHours}
					<td className="hour-b"><p/></td>
				</tr>
			</tbody>
		</table>
		);
	}
} 

export default CalendarWeekDay;