// react modules
import React from 'react'
// custom components
import Day from './Day.jsx';
// custom modules
import DAYS_SHORT from '../../utils/date/DateConstants.js';

class Week extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() { 
		var days = this.props.week.days.map(function(day) {
            return (
                <Day key={day.id} day={day}/>
            );
        });
		return (
			<tr>{days}</tr>
		);
	}
}

export default Week;