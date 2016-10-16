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
			<Col xs={4}>
				<Button block>
					{this.props.name}
				</Button>
			</Col>
		);
	}
}

export default CalendarMonthsMonth;