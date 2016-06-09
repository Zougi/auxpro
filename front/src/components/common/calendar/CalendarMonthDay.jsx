// react modules
import React from 'react'
import moment from 'moment'
// react-bootstrap modules
import { Button } from 'react-bootstrap';

class CalendarMonthDay extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() { 
		let clazz = 'day';
		//clazz += this.props.notmonth ? ' notmonth' : '';
		clazz += this.props.selected ? ' selected' : '';
		//clazz += this.props.display.isBefore(moment().startOf('days')) ? ' past' : '';
		return (
			<td>
				<Button 
					bsSize={this.props.bsSize} 
					bsStyle={this.props.bsStyle} 
					className={clazz} 
					block 
					onClick={this.props.onDaySelect}>
					{this.props.display.date()}
				</Button>
			</td>
		);
	}
}

export default CalendarMonthDay;