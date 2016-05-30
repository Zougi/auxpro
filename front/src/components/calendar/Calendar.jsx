// react modules
import React from 'react'
// react-bootstrap modules
import { Panel, Grid, ButtonGroup, Button, Glyphicon, Pager, PageItem } from 'react-bootstrap';
// custom components
import CalendarMonth from './CalendarMonth.jsx'
import CalendarWeek from './CalendarWeek.jsx'
// custom modules
import DateDay from '../../utils/date/DateDay.js';

let MODES = {
	M: 'M',
	W: 'W'
}

let INITIAL_STATE = {
	mode: MODES.W,
	day: new DateDay(new Date())
}

class Calendar extends React.Component {

	constructor(props) {
		super(props);
		this.state = INITIAL_STATE;
	}

	onDaySelect(day) {
		this.state.day = day;
		this.setState(this.state);
	}

	setMode(mode) {
		return function () {
			this.state.mode = mode;
			this.setState(this.state);
			this.props.onModeChanged(mode);
		}.bind(this);
	}

	render() { 
		var header = (
			<table style={{width:'100%', tableLayout:'fixed'}}>
				<tbody>
					<tr>
						<td>
							<div style={{textAlign:'left'}}>
								Planning
							</div>
						</td>
						<td>
							<div style={{textAlign:'right'}}>
								<ButtonGroup>
								    <Button bsSize='xsmall' onClick={this.setMode(MODES.M).bind(this)} active={this.state.mode === MODES.M}><Glyphicon glyph="th"/></Button>
								    <Button bsSize='xsmall' onClick={this.setMode(MODES.W).bind(this)} active={this.state.mode === MODES.W}><Glyphicon glyph="th-list"/></Button>
					  			</ButtonGroup>
					  		</div>
						</td>
					</tr>
				</tbody>
			</table>
	  	);
		return ( 
			<Panel header={header} className='calendar'>
				{this.state.mode === MODES.M
				? 
					<CalendarMonth onDaySelect={this.onDaySelect.bind(this)} day={this.state.day} planing={this.props.planing}/> 
				: 
					<CalendarWeek onDaySelect={this.onDaySelect.bind(this)} day={this.state.day}/> 
				}
			</Panel>
	    );
	}
}

export default Calendar;