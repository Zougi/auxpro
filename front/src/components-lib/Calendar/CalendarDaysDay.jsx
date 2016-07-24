import React from 'react'
import moment from 'moment'
import { Button } from 'react-bootstrap';

import './Calendar.css';

class CalendarDaysDay extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {};
		if (this._inSpecials(props.specialsInfo)) {
			this.state.bsStyle = 'info';
		}
		if (this._inSpecials(props.specialsPrimary)) {
			this.state.bsStyle = 'primary';
		}
		if (this._inSpecials(props.specialsSuccess)) {
			this.state.bsStyle = 'success';
		}
		if (this._inSpecials(props.specialsWarning)) {
			this.state.bsStyle = 'warning';
		}
		if (this._inSpecials(props.specialsDanger)) {
			this.state.bsStyle = 'danger';
		}
	}

	_inSpecials(specials) {
		let y = this.props.moment.format('YYYY');
		let m = this.props.moment.format('MM');
		let d = this.props.moment.format('DD');
		if (specials[y] && specials[y][m]) {
			return specials[y][m][d];
		}
	}


	onClick(event) {
		event.preventDefault();
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
					bsStyle={this.state.bsStyle} 
					block 
					onClick={this.onClick.bind(this)}>
					{this.props.moment.date()}
				</Button>
			</td>
		);
	}
}

export default CalendarDaysDay;