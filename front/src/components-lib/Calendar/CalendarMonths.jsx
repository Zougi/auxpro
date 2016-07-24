import React from 'react'
import moment from 'moment'
import { Button } from 'react-bootstrap';

import './Calendar.css';

class CalendarMonths extends React.Component {
	
	constructor(props) {
		super(props);
	}

	onYearSelected(event) {
		event.preventDefault();
		if (this.props.onChange) {
			this.props.onChange(this.props.moment);
		}
	}

	render() { 
		return (
			<td>
				<Button 
					bsSize={this.props.bsSize} 
					bsStyle={this.props.bsStyle} 
					className={clazz} 
					block 
					onClick={this.onClick.bind(this)}>
					{this.props.moment.month()}
				</Button>
			</td>
		);
	}
}

export default CalendarMonths;