// react modules
import React from 'react'
// react-bootstrap modules
import { Button } from 'react-bootstrap';
// custom modules
import { D, NOW } from '../../utils/date/DateConstants.js';

class CalendarMonthDay extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = this._buildState(props);
	}

	componentWillReceiveProps(props) {
		this.setState(this._buildState(props));
    }

    _buildState(props) {
		let ispast = (props.day.date.getTime() + D < NOW.getTime());
		let ismonth = (props.month === props.day.date.getMonth());
		let style = (props.planing&&props.planing[0])?props.planing[0].style:'default';
		return {
			active: false,
			class: 'day' + (ispast?' past':'') + (ismonth?'':' notmonth'),
			style: style||'default'
		};
    }

	onDayClicked() {
		this.setState( { active: !this.state.active } );
		this.props.onDaySelect(this.props.day);
	}

	render() { return (
		<td>
			<Button bsSize='small' bsStyle={this.state.style} className={this.state.class} block active={this.state.active} onClick={this.onDayClicked.bind(this)}>
				{this.props.day.date.getDate()}
			</Button>
		</td>
	);}
}

export default CalendarMonthDay;