// react modules
import React from 'react'
import moment from 'moment'
import { Pager, PageItem, Table, Panel, Grid, Row, Col, Button } from 'react-bootstrap';
// custom components
import CalendarWeekDay from './CalendarWeekDay.jsx';

moment.locale('fr');

class CalendarWeekWeek extends React.Component {

	constructor(props) {
		super(props);
		this.start = props.moment.clone().startOf('days').add(8, 'hours');
		this.end = props.moment.clone().startOf('days').add(20, 'hours');
		this.interval = moment.duration(30, 'minutes');
	}

	_buildDays() {
		let weekStart = this.props.moment.startOf('weeks').clone();
		let days = [];
		for (let i = 0; i < 7; i++) {
			let day = weekStart.clone().add(i, 'days');
			days.push(day);
		}
		return days;
	}
	_buildIntervals() {
		let intervals = [];
		var current = this.start.clone();
		intervals.push(this.props.moment.clone().startOf('days'));
		while (current.isBefore(this.end)) {
			let hour = current.clone();
			intervals.push(hour);
			current.add(this.interval);
		}
		intervals.push(this.end);
		return intervals;
	}

	render() { 
		var weekDays = this._buildDays();
		let days = weekDays.map(function (day) {
			return (<CalendarWeekDay key={day.format()} moment={day} onDaySelect={this.props.onDaySelect}/>)
		}.bind(this));

		let heads = weekDays.map(function (day) {
			return (<tr key={day.format()} ><td className='head'><div>{day.format('dd')}<br/>{day.format('DD')}</div></td></tr>)
		}.bind(this));

		let intervals = this._buildIntervals().map(function (interval) {
			let HH = interval.format('HH');
			let mm = interval.format('mm');
			let label = (HH==='00'&&mm==='00')?'':(mm==='00'?HH + 'h' + mm:'');
			return (<td key={interval.format()}><div>{label}</div></td>)
		}.bind(this));
	
		return (
			<table className='calendar-week'>
				<tbody>
					<tr>
						<td className='blue'>
						</td>
						<td>
							<table className='interval blue'>
								<tbody>
									<tr>
										{intervals}
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr>
						<td>
							<table>
								<tbody>
									{heads}
								</tbody>
							</table>
						</td>
						<td>
							<table className='table-week'>
								<tbody>
									{days}		
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
} 

export default CalendarWeekWeek;