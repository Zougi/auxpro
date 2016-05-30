// react modules
import React from 'react'

class CalendarWeekDay extends React.Component {

	constructor(props) {
		super(props);
	}

	onHourClicked(event) {
		this.props.onDaySelect(this.props.day);
	}

	render() { 
		var classes = "day";
		if (this.props.selected) {
			classes += " selected";
		}

		let timesHours = this.props.times.map(function(time) {
			if (time.indexOf('h30') === -1) {
				return (<td key={time} className="hour" onClick={this.onHourClicked.bind(this)}><p/></td>);
			} else {
				return (<td key={time} className="hour start" onClick={this.onHourClicked.bind(this)}><p/></td>);
			}
		}.bind(this));

		return (
		<tr className={classes}>
			<td className="hour-b"><p/></td>
			{timesHours}
			<td className="hour-b"><p/></td>
		</tr>
		);
	}
} 

export default CalendarWeekDay;