// react modules
import React from 'react'
// react-bootstrap modules
import { Button } from 'react-bootstrap';
// custom modules
import { D, NOW } from '../../utils/date/DateConstants.js';

class Day extends React.Component {
	
	constructor(props) {
		super(props);
		var ispast = (this.props.day.date.getTime() + D < NOW.getTime());
		var ismonth = (this.props.month === this.props.day.date.getMonth());
		this.state = {
			active: false,
			class: 'day' + (ispast?' past':'') + (ismonth?'':' notmonth')
		};
	}

	onDayClicked() {
		this.setState( { active: !this.state.active } );
		this.props.onDaySelect(this.props.day);
	}

	render() { return (
		<td>
			<Button bsStyle='success' className={this.state.class} block active={this.state.active} onClick={this.onDayClicked.bind(this)}>
				{this.props.day.date.getDate()}
			</Button>
		</td>
	);}
}

export default Day;