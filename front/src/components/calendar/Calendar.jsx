// react modules
import React from 'react'
// react-bootstrap modules
import { Panel, Grid, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';
// custom components
import CalendarMonth from './CalendarMonth.jsx'
import CalendarWeek from './CalendarWeekWeek.jsx'

class Calendar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			mode: 'WEEK'
		}		
	}


	render() { 
		var header = (
			<div style={{textAlign:'right'}}>
				<ButtonGroup>
				    <Button bsSize='xsmall'><Glyphicon glyph="th"/></Button>
				    <Button bsSize='xsmall'><Glyphicon glyph="th-list"/></Button>
	  			</ButtonGroup>
	  		</div>
	  	);
		return ( 
			<Panel header={header} className='calendar'>
				{this.state.mode === 'MONTH' ? <CalendarMonth/> : <CalendarWeek/> }
			</Panel>
	    );
	}
}

export default Calendar;