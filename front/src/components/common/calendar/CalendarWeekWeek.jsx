// react modules
import React from 'react'
// react-bootstrap modules
import { Pager, PageItem, Table, Panel, Grid, Row, Col, Button } from 'react-bootstrap';

// custom components
import CalendarWeekDay from './CalendarWeekDay.jsx';

class CalendarWeekWeek extends React.Component {

	constructor(props) {
		super(props);
	}

	render() { 
		let times = [
			'08h', '08h30', '09h', '09h30', '10h', '10h30', '11h', '11h30', '12h', '12h30', '13h', '13h30', 
			'14h', '14h30', '15h', '15h30', '16h', '16h30', '17h', '17h30', '18h', '18h30', '19h', '19h30',
			'20h'
		];
		let days = [];
		for (let i = 0; i < this.props.week.days.length; i++) {
			let curDay = this.props.week.days[i];
			if (curDay.id === this.props.day.id) {
				days.push((<CalendarWeekDay onDaySelect={this.props.onDaySelect} day={curDay} key={curDay.id} times={times} selected/>));
			} else {
				days.push((<CalendarWeekDay onDaySelect={this.props.onDaySelect} day={curDay} key={curDay.id} times={times}/>));
			}
			
			if (i < this.props.week.days.length - 1) {
				days.push((<tr key={curDay.id + 'sep'}><td><div className="sep"/></td></tr>));
			}
		}
		let timesHeads = [];
		for (let i = 0; i < times.length; i++) {
			if (i%4 === 2) {
				timesHeads.push((<th key={times[i]} className="hour-head"><p/><div className="hidden-xs">{times[i]}</div><p/></th>));
			} else if (i%2 === 0) {
				timesHeads.push((<th key={times[i]} className="hour-head">{times[i]}</th>));
			}
		}

		return (
		<Panel className="calendar">
			<table style={{width:"100%"}} className="calendar-week">
				<thead><tr>
					{timesHeads}
				</tr></thead>
			</table>
			<table style={{width:"100%"}} className="calendar-week">
				<tbody>
					{days}		
				</tbody>
			</table>
    	</Panel>
    );}
} 

export default CalendarWeekWeek;