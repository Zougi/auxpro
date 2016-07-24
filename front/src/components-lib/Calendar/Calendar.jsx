import React from 'react'
import moment from 'moment'

import './Calendar.css';
import SelectorYear from './SelectorYear.jsx';
import SelectorMonth from './SelectorMonth.jsx';
import CalendarDays from './CalendarDays.jsx';
import CalendarMonths from './CalendarMonths.jsx';
import CalendarYears from './CalendarYears.jsx';

moment.locale('fr');

let STATES = {
	SELECT_DAY   : 'SELECT_DAY',
	SELECT_MONTH : 'SELECT_MONTH',
	SELECT_YEAR  : 'SELECT_YEAR'
}

class Calendar extends React.Component {

	constructor(props) {
		super(props);
		this.onComponentWillReceiveProps(props, true);
	}

	onComponentWillReceiveProps(props, first) {
		let m = props.moment ? props.moment.clone() : moment();
		let s = props.selected ? props.selected.clone() : moment();
		this.state = {
			moment: m.startOf('month'),
			selected: s,
			state: STATES.SELECT_DAY,
			specialsSuccess: this._buildSpecials(props.specialsSuccess),
			specialsInfo: this._buildSpecials(props.specialsInfo),
			specialsPrimary: this._buildSpecials(props.specialsPrimary),
			specialsWarning: this._buildSpecials(props.specialsWarning),
			specialsDanger: this._buildSpecials(props.specialsDanger)
		}
		if (!first) this.setState(this.state);
	}

	_buildSpecials(specials) {
		let result = {};
		if (specials && specials.length) {
			for (let i = 0; i < specials.length; i++) {
				let special = specials[i];
				let y = special.format('YYYY'); 
				let m = special.format('MM'); 
				let d = special.format('DD'); 
				result[y] = result[y] || {};
				result[y][m] = result[y][m] || {};
				result[y][m][d] = true;
			}
		}
		return result;
	}

	setStateSelectDay() {
		this.setState({ state: STATES.SELECT_DAY });
	}
	setStateSelectMonth() {
		this.setState({ state: STATES.SELECT_MONTH });
	}
	setStateSelectYear() {
		this.setState({ state: STATES.SELECT_YEAR });
	}

	onYearChanged(year) {
		this.setState({ moment: this.state.moment.year(year) });
	}
	onMonthChanged(month) {
		this.setState({ moment: this.state.moment.month(month) });
	}

	onDaySelect(day) {
		this.setState({ selected: day });
		if (this.props.onDaySelect) {
			this.props.onDaySelect(day);
		}
	}

	render() { 
		switch (this.state.state) {
		case STATES.SELECT_DAY: return(
			<div className='ap-calendar'>
				<CalendarDays 
					bsSize={this.props.bsSize || 'xsmall'}
					moment={this.state.moment}
					selected={this.state.selected}
					specialsSuccess={this.state.specialsSuccess}
					specialsInfo={this.state.specialsInfo}
					specialsPrimary={this.state.specialsPrimary}
					specialsWarning={this.state.specialsWarning}
					specialsDanger={this.state.specialsDanger}
					onYearChanged={this.onYearChanged.bind(this)}
					onYearMode={this.setStateSelectYear.bind(this)}
					onMonthChanged={this.onMonthChanged.bind(this)}
					onMonthMode={this.setStateSelectMonth.bind(this)} 
					onDaySelect={this.onDaySelect.bind(this)}/>
			</div>
		);
		case STATES.SELECT_MONTH:
		case STATES.SELECT_YEAR:
			return '';
		}
    }
}

export default Calendar;