// react modules
import React from 'react'

class CalendarWeekDay extends React.Component {

	constructor(props) {
		super(props);
		console.log('here');
	}

	onHourClicked(event) {
		console.log(event);
	}

	render() { 

		let times = [
			'08h', '08h30', '09h', '09h30', '10h', '10h30', '11h', '11h30', '12h', '12h30', '13h', '13h30', 
			'14h', '14h30', '15h', '15h30', '16h', '16h30', '17h', '17h30', '18h', '18h30', '19h', '19h30',
			'20h'
		];

		let timesHours = this.props.times.map(function(time) {
			if (time.indexOf('h30') === -1) {
				return (<td key={time} className="hour" onClick={this.onHourClicked}><p/></td>);
			} else {
				return (<td key={time} className="hour start" onClick={this.onHourClicked}><p/></td>);
			}
		}.bind(this));

		return (
		<tr className="day">
			<td className="hour-b"><p/></td>
			{timesHours}
			<td className="hour-b"><p/></td>
		</tr>
		);
	}
} 

export default CalendarWeekDay;