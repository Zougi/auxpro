// lib modules
import React from 'react'
import moment from 'moment'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import './Calendar.css';

class CalendarWeekTime extends React.Component {

	constructor(props) {
		super(props);

	}

	render() { 
		var classes = 'hour';
		if (this.props.selected) {
			classes += ' selected';
		}
		if (this.props.bsStyle) {
			classes += ' ' + this.props.bsStyle;
		}
		return (
			<td className={classes} colSpan={this.props.colSpan || 1} onClick={this.props.onClick}>
				{this.props.text}
			</td>
		);
	}
} 

export default CalendarWeekTime;