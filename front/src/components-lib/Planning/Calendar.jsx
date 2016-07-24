// lib modules
import React from 'react'
import moment from 'moment'
import { Panel, Grid, ButtonGroup, Button, Glyphicon, Pager, PageItem } from 'react-bootstrap';
// custom components
import CalendarMonth from './CalendarMonth.jsx'
import CalendarWeek from './CalendarWeek.jsx'

import './Calendar.css';

let MODES = {
	M: 'M',
	W: 'W'
}

let INITIAL_STATE = {
	mode: MODES.W
}

class Calendar extends React.Component {

	constructor(props) {
		super(props);
		this.state = INITIAL_STATE;
	}

	setModeMonth() {
		if (this.state.mode !== MODES.M) {
			this.state.mode = MODES.M;
			this.setState(this.state);
			this.props.onModeChanged(MODES.M);
		}
	}
	setModeWeek() {
		if (this.state.mode !== MODES.W) {
			this.state.mode = MODES.W;
			this.setState(this.state);
			this.props.onModeChanged(MODES.W);
		}
	}

	render() { 
		return ( 
			<Panel className='calendar'>
			{this.state.mode === MODES.M
			? 
				<CalendarMonth 
					now={this.props.now}
					display={this.props.display} 
					selected={this.props.selected} 
					toggleMode={this.setModeWeek.bind(this)}
					onDaySelect={this.props.onDaySelect} 
					planing={this.props.planing}/> 
			: 
				<CalendarWeek 
					now={this.props.now}
					display={this.props.display} 
					selected={this.props.selected} 
					toggleMode={this.setModeMonth.bind(this)}
					onDaySelect={this.props.onDaySelect} 
					planing={this.props.planing}/> 
			}
			</Panel>
	    );
	}
}

export default Calendar;