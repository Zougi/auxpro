// react modules
import React from 'react'
import moment from 'moment'
// react-bootstrap modules
import { Button } from 'react-bootstrap';

import './Calendar.css';

class CalendarYear extends React.Component {
	
	constructor(props) {
		super(props);
	}

	onYearSelected(event) {
		event.preventDefault();
		if (this.props.onChange) {
			this.props.onChange(this.props.display);
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
					{this.props.display.date()}
				</Button>
			</td>
		);
	}
}

export default CalendarYear;