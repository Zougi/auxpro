import React from 'react'
import { Panel, Row, Col } from 'react-bootstrap'
// Custom modules
import FormBuilder from 'components-lib/Form/FormBuilder'
import Validators from 'utils/form/Validators'
import Utils from 'utils/Utils'
import { DAYS_LIST } from 'utils/moment/Days'

class InterventionDetailsRecurence extends React.Component {
	
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
			startDate: props.startDate,
			endDate: props.endDate,
			startTime: props.startTime,
			endTime: props.endTime,
			days: props.days,
			period: props.period
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
					title: 'Du',
					type: 'date',
					edit: this.props.edit,
					defaultValue: this.state.startDate,
					changeHandler: this.changeHandler('startDate'),
					validator: Validators.NonNull
				},
				{
					title: 'Au',
					type: 'date',
					edit: this.props.edit,
					defaultValue: this.state.endDate,
					changeHandler: this.changeHandler('endDate'),
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
				},
				{
					title: 'Périodicité',
					type: 'select',
					edit: this.props.edit,
					defaultValue: this.state.period,
					changeHandler: this.changeHandler('period'),
					validator: Validators.NonNull,
					values: [
						{ key: 'P1W', value: 'Hebdomadaire' },
						{ key: 'P2W', value: 'Une semaine sur deux' },
						{ key: 'P3W', value: 'Une semaine sur trois' },
						{ key: 'P4W', value: 'Une semaine sur quatre' }
					]
				}
			],
			[
				{
					title: 'Jours',
					type: 'selectMulti',
					edit: this.props.edit,
					defaultValue: this.state.days,
					changeHandler: this.changeHandler('days'),
					validator: Validators.NonEmptyArray,
					values: this._buildDays()			
				}
			]
		]
	}
	_buildDays() {
		let result = [];
		for (let i = 0; i < DAYS_LIST.length; i++) {
			let day = DAYS_LIST[i];
			result.push({
				key: day.id,
				value: day.fr
			});
		}
		return result;
	}

	render() { 
		return (
		<div>
			{FormBuilder.buildFormGroups(this._buildInfos())}
		</div>
	);}
}
export default InterventionDetailsRecurence;