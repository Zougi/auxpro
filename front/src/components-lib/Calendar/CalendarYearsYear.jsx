import React from 'react'
import moment from 'moment'
import { Button, Col } from 'react-bootstrap';

import './Calendar.css';

class CalendarYearYear extends React.Component {
	
	constructor(props) {
		super(props);
	}

	onSelect(event) {
		if (this.props.onSelect) {
			this.props.onSelect(event);
		}
	}

	render() { 
		return (
			<Col xs={3}>
				<Button onClick={this.onSelect.bind(this)} block>
					{this.props.name}
				</Button>
			</Col>
		);
	}
}

export default CalendarYearYear;