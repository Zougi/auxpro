// react modules
import React from 'react'
import moment from 'moment'
// react-bootstrap modules
import { Button } from 'react-bootstrap';

import CalendarYearsYear from 'components-lib/Calendar/CalendarYearsYear.jsx';

import './Calendar.css';

class CalendarYear extends React.Component {
	
	constructor(props) {
		super(props);
	}

	onYearSelected(year) {
		return function (event) {
			if (this.props.onYearSelect) {
				this.props.onYearSelect(year);
			}
		}.bind(this);
	}

	_buildYears() {
		let result = [];
		for (var i = 2016; i >= 1900; i--) {
			result.push(
				<CalendarYearsYear 
					key={i}
					name={i}
					onSelect={this.onYearSelected(i)} />
			);
		}
		return result;
	}

	render() { 
		return (
			<div>
				{this._buildYears()}
			</div>
		);
	}
}

export default CalendarYear;