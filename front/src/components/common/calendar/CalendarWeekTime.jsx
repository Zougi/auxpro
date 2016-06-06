// lib modules
import React from 'react'
import moment from 'moment'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

class CalendarWeekTime extends React.Component {

	constructor(props) {
		super(props);
	}

	render() { 
		var classes = 'hour';
		if (this.props.selected) {
			classes += ' selected';
		}
		return (
			<td className={classes} onClick={this.props.onClick}>
				<p/>
			</td>
		);
	}
} 

export default CalendarWeekTime;