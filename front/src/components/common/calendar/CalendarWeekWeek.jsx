// react modules
import React from 'react'
import moment from 'moment'
import { Pager, PageItem, Table, Panel, Grid, Row, Col, Button } from 'react-bootstrap';
// custom components
import CalendarWeekDay from './CalendarWeekDay.jsx';
// custom modules
import { buildWeekDays, buildDayInterval } from '../../../utils/moment/MomentHelper.js'

moment.locale('fr');

class CalendarWeekWeek extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		//
		let d = buildWeekDays(this.props.display);
		let days = this._renderDays(d);
		let heads = this._renderDaysHeaders(d);
		//
		let i = buildDayInterval(
			this.props.display, 
			this.props.display.clone().startOf('days').add(8, 'hours'),
			this.props.display.clone().startOf('days').add(20, 'hours'),
			moment.duration(30, 'minutes'));
		let intervals = this._renderIntervals(i);
	
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
	
	_renderDays(days) {
		return days.map(function (day) {
			return (
				<CalendarWeekDay 
					key={day.format()} 
					now={this.props.now}
					display={day} 
					selected={this.props.selected} 
					planing={this.props.planing}
					onDaySelect={this.props.onDaySelect}/>
			);
		}.bind(this));
	}
	_renderDaysHeaders(days) {
		return days.map(function (day) {
			return (
				<tr key={day.format()}>
					<td className='head'>
						<div>
							{day.format('dd')}
							<br/>
							{day.format('DD')}
						</div>
					</td>
				</tr>
			);
		}.bind(this));
	}
	_renderIntervals(intervals) {
		return intervals.map(function (interval) {
			let HH = interval.format('HH');
			let mm = interval.format('mm');
			let label = (HH==='00'&&mm==='00')?'':(mm==='00'?HH + 'h' + mm:'');
			return (<td key={interval.format()}><div>{label}</div></td>)
		}.bind(this));
	}
} 

export default CalendarWeekWeek;