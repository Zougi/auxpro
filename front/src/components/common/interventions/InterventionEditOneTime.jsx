// lib modules
import React from 'react';
import { Panel } from 'react-bootstrap';

import FormDate from '../form/FormDate.jsx'
import FormTime from '../form/FormTime.jsx'

class InterventionEditOneTime extends React.Component {
	
	constructor(props) {
		super(props);
		this.data = {
			oneTime: {
				date: props.oneTime ? props.oneTime.date : null,
				startTime: props.oneTime ? props.oneTime.startTime : null,
				endTime: props.oneTime ? props.oneTime.endTime : null
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
			<Panel>
				<FormDate
					defaultValue={this.data.oneTime.date}
					static={false}
					title='Date'
					onChange={this.onDateChanged.bind(this)}/>
				<br/><br/>
				<FormTime
					defaultValue={this.data.oneTime.startTime}
					static={false}
					title='Début'
					onChange={this.onStartTimeChanged.bind(this)}/>
				<br/><br/>
				<FormTime
					defaultValue={this.data.oneTime.endTime}
					static={false}
					title='Fin'
					onChange={this.onEndTimeChanged.bind(this)}/>
			</Panel>
		);
	}
}

export default InterventionEditOneTime;