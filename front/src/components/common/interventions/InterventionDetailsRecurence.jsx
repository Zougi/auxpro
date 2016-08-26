import React from 'react';
import { Panel, Row, Col } from 'react-bootstrap';

import FormDate from 'components-lib/Form/FormDate.jsx'
import FormTime from 'components-lib/Form/FormTime.jsx'
import FormSelectMulti from 'components-lib/Form/FormSelectMulti.jsx'

import { DAYS_LIST } from 'utils/moment/Days.js'

class InterventionDetailsRecurence extends React.Component {
	
	constructor(props) {
		super(props);
		this.onComponentWillReceiveProps(props);
	}

	onComponentWillReceiveProps(props) {
		this.data = {
			startDate: props.recurence ? props.recurence.startDate : null,
			endDate: props.recurence ? props.recurence.endDate : null,
			days: props.recurence ? props.recurence.days : [],
			startTime: props.recurence ? props.recurence.startTime : [0, 0],
			endTime: props.recurence ? props.recurence.endTime : [0, 0]
		}
	}

	onStartDateChanged(value) {
		this.data.startDate = value;
		this.onChange();
	}
	onEndDateChanged(value) {
		this.data.endDate = value;
		this.onChange();
	}
	onDaysChanged(values) {
		this.data.days = [];
		for (let i = 0; i < values.length; i++) {
			let v = values[i];
			if (v.selected) {
				this.data.days.push(v.key);
			}
		}
		this.onChange();
	}
	onStartTimeChanged(value) {
		this.data.startTime = value;
		this.onChange();
	}
	onEndTimeChanged(value) {
		this.data.endTime = value;
		this.onChange();
	}
	
	onChange() {
		if (this.props.onChange) {
			this.props.onChange(this.data);
		}
	}

	_buildDays() {
		let result = [];
		for (let i = 0; i < DAYS_LIST.length; i++) {
			let day = DAYS_LIST[i];
			result.push({
				key: day.id,
				value: day.fr,
				selected: this.data.days.indexOf(day.id) !== -1
			});
		}
		return result;
	}

	render() {
		return (
			<div>
				<FormDate
					defaultValue={this.data.startDate}
					static={!this.props.edit}
					title='Du'
					onChange={this.onStartDateChanged.bind(this)}/>
				<br className='hidden-xs'/><br className='hidden-xs'/>
				<FormDate
					defaultValue={this.data.endDate}
					static={!this.props.edit}
					title='Au'
					onChange={this.onEndDateChanged.bind(this)}/>
				<br className='hidden-xs'/>
				<Row>
					<Col>
						<FormSelectMulti
							static={!this.props.edit}
							title='Jours'
							values={this._buildDays()}
							onChange={this.onDaysChanged.bind(this)}/>
					</Col>
				</Row>
				<br/>
				<Row>
					<Col>
						<FormTime
							defaultValue={this.data.startTime}
							static={!this.props.edit}
							title='Début'
							onChange={this.onStartTimeChanged.bind(this)}/>
					</Col>
					<Col>
						<FormTime
							defaultValue={this.data.endTime}
							static={!this.props.edit}
							title='Fin'
							onChange={this.onEndTimeChanged.bind(this)}/>
					</Col>
				</Row>
			</div>
		);
	}
}

export default InterventionDetailsRecurence;