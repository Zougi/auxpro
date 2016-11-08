import React from 'react';
import { Row } from 'react-bootstrap';
// Custom modules
import FormBuilder from 'components-lib/Form/FormBuilder'
import Validators from 'utils/form/Validators'
import Utils from 'utils/Utils'

class InterventionDetailsOneTime extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = this._buildState(props);
	}


	// State Management functions //
	// --------------------------------------------------------------------------------

	onComponentWillReceiveProps(props) {
		this.setState(this.state = this._buildState(props));
	}
	_buildState(props) {
		return {
			date: props.date,
			startTime: props.startTime,
			endTime: props.endTime
		};
	}


	// Callbacks functions //
	// --------------------------------------------------------------------------------

	changeHandler(field) { 
		return function (event) {
			let value = event.value || event;
			Utils.setField(this.state, field, value); 
			if (this.props.onChange) {
				this.props.onChange(this.state);
			}
		}.bind(this);
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildInfos() {
		return [
			[
				{
					title: 'Date',
					type: 'date',
					edit: this.props.edit,
					defaultValue: this.state.date,
					changeHandler: this.changeHandler('date'),
					validator: Validators.NonNull
				},
				{
					title: 'Début',
					type: 'time',
					edit: this.props.edit,
					defaultValue: this.state.startTime,
					changeHandler: this.changeHandler('startTime'),
					validator: Validators.NonNull
				},
				{
					title: 'Fin',
					type: 'time',
					edit: this.props.edit,
					defaultValue: this.state.endTime,
					changeHandler: this.changeHandler('endTime'),
					validator: Validators.NonNull
				}
			],
			[]
		]
	}

	render() {
		return (
			<div>
				{FormBuilder.buildFormGroups(this._buildInfos())}
			</div>
		);
	}
}

export default InterventionDetailsOneTime;