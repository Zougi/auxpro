import React from 'react';
import { Panel } from 'react-bootstrap';

import FormDate from '../form/FormDate.jsx'
import FormTime from '../form/FormTime.jsx'

class InterventionDetailsOneTime extends React.Component {
	
	constructor(props) {
		super(props);
		this.data = {
			oneTime: {
				date: props.oneTime ? props.oneTime.date : null,
				startTime: props.oneTime ? props.oneTime.startTime : [0, 0],
				endTime: props.oneTime ? props.oneTime.endTime : [0, 0]
			}
		}
	}

	onStartTimeChanged(value) {
		this.data.oneTime.startTime = value;
		this.onChange();
	}
	onEndTimeChanged(value) {
		this.data.oneTime.endTime = value;
		this.onChange();
	}
	onDateChanged(value) {
		this.data.oneTime.date = value;
		this.onChange();
	}
	onChange() {
		if (this.props.onChange) {
			this.props.onChange(this.data.oneTime);
		}
	}

	render() {
		return (
			<div>
				<FormDate
					defaultValue={this.data.oneTime.date}
					static={!this.props.edit}
					title='Date'
					onChange={this.onDateChanged.bind(this)}/>
				<br/><br/>
				<FormTime
					defaultValue={this.data.oneTime.startTime}
					static={!this.props.edit}
					title='Début'
					onChange={this.onStartTimeChanged.bind(this)}/>
				<br/><br/>
				<FormTime
					defaultValue={this.data.oneTime.endTime}
					static={!this.props.edit}
					title='Fin'
					onChange={this.onEndTimeChanged.bind(this)}/>
			</div>
		);
	}
}

export default InterventionDetailsOneTime;