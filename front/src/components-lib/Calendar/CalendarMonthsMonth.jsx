import React from 'react'
import moment from 'moment'
import { Button } from 'react-bootstrap';

import './Calendar.css';

class CalendarMonthsMonth extends React.Component {
	
	constructor(props) {
		super(props);
	}

	onSelected(event) {
		if (this.props.onChange) {
			this.props.onChange(this.props.display);
		}
	}

	render() { 
		return (
			<td>
				<Button 
					bsSize={this.props.bsSize || 'xsmall'} 
					bsStyle={this.props.bsStyle || 'primary'} 
					block 
					
					onClick={this.onSelected.bind(this)}>
					{this.props.year}
				</Button>
			</td>
		);
	}
}

export default CalendarMonthsMonth;