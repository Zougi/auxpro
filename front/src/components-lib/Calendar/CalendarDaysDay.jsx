import React from 'react'
import moment from 'moment'
import { Button } from 'react-bootstrap';

import './Calendar.css';

class CalendarDaysDay extends React.Component {
	
	constructor(props) {
		super(props);
	}

	_computeStyle() {
		if (this._inSpecials(this.props.specialsDanger)) {
			return 'danger';
		}
		if (this._inSpecials(this.props.specialsSuccess)) {
			return 'success';
		}
		if (this._inSpecials(this.props.specialsWarning)) {
			return 'warning';
		}
		if (this._inSpecials(this.props.specialsPrimary)) {
			return 'primary';
		}
		if (this._inSpecials(this.props.specialsInfo)) {
			return 'info';
		}
	}

	_inSpecials(specials) {
		let y = this.props.moment.format('YYYY');
		let m = this.props.moment.format('MM');
		let d = this.props.moment.format('DD');
		if (specials && specials[y] && specials[y][m]) {
			return specials[y][m][d];
		}
	}

	onDaySelect(event) {
		if (this.props.onDaySelect) {
			this.props.onDaySelect(this.props.moment);
		}
	}

	render() { 
		let clazz = 'day';
		//clazz += this.props.notmonth ? ' notmonth' : '';
		clazz += this.props.selected ? ' selected' : '';
		//clazz += this.props.display.isBefore(moment().startOf('days')) ? ' past' : '';
		return (
			<td className={clazz}>
				<Button 
					bsSize={this.props.bsSize} 
					bsStyle={this._computeStyle()} 
					block 
					onClick={this.onDaySelect.bind(this)}>
					{this.props.moment.date()}
				</Button>
			</td>
		);
	}
}

export default CalendarDaysDay;