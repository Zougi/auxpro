// lib modules
import React from 'react'
import moment from 'moment'
import { Panel, Button, Row, Col, Clearfix, Form } from 'react-bootstrap'
// core modules
import Dispatcher from 'core/Dispatcher'
import StoreRegistry from 'core/StoreRegistry'
// custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent'
import FormBuilder from 'components-lib/Form/FormBuilder'
import ButtonsEndDialog from 'components-lib/ButtonsEndDialog/ButtonsEndDialog'
// Lib modules
import Utils from 'utils/Utils'
import Day from 'utils/constants/Day'
import Period from 'utils/constants/Period'
import Validators from 'utils/form/Validators'
import MomentHelper from 'utils/moment/MomentHelper'
import InterventionHelper from 'utils/entities/InterventionHelper'

moment.locale('fr')

let MODES = {
	CREATE: 'CREATE',
	EDIT: 'EDIT'
}

class ServiceInterventionEdit extends ServiceBaseComponent {

	constructor(props) {
		super(props);
		this.state = this._buildState();
	}


	// State Management functions //
	// --------------------------------------------------------------------------------

	componentDidMount() {
		StoreRegistry.register('SERVICE_STORE', this, this.onStoreUpdate.bind(this));
	}
	componentWillUnmount() {
		StoreRegistry.unregister('SERVICE_STORE', this);
	}
	onStoreUpdate() {
		this.setState(this._buildState());
	}
	_buildState() {
		if (this.props.params.interventionId) {
			let intervention = this.getIntervention(this.props.params.interventionId);
			return {
				mode: MODES.EDIT,
				customers: Utils.map(this.getCustomers()),
				intervention: intervention,
				validationState: InterventionHelper.checkValidation(intervention),
			};
		} else {
			let customers = Utils.map(this.getCustomers());
			return {
				mode: MODES.CREATE,
				customers: customers,
				intervention: {
					serviceId: this.getLoginData('/id'),
					customerId: customers[0].id,
					period: 'ONE',
					startDate: MomentHelper.toLocalDate(moment()),
					endDate: MomentHelper.toLocalDate(moment())
				},
				validationState: false
			};
		}
	}


	// Callbacks functions //
	// --------------------------------------------------------------------------------

	onSaveIntervention() {
		if (this.state.mode === MODES.CREATE) {
			this.createIntervention(this.state.intervention).
			then(function () {
				Dispatcher.issue('NAVIGATE', {path: '/sad/interventions'});
			});
		} else {
			this.updateIntervention(this.state.intervention).
			then(this.loadInterventions.bind(this)).
			then(function () {
				Dispatcher.issue('NAVIGATE', {path: '/sad/interventions'});
			});
		}
	}

	onCancel() {
		Dispatcher.issue('NAVIGATE', {path: '/sad/interventions'});
	}   

	changeHandler(field) { 
		return function (event) {
			let value = event.value || event;
			Utils.setField(this.state.intervention, field, value); 
			this.setState({ 
				validationState: InterventionHelper.checkValidation(this.state.intervention)
			});
		}.bind(this);
	}

	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildCustomers() {
		return (this.state.customers || []).map(function(customer) {
			return {
				key: customer.id,
				value: customer.lastName + ' ' + customer.firstName
			};
		}.bind(this))
	}

	_buildTopInfos() {
		let mode = (this.state.mode === MODES.CREATE);
		return [[
			{
				title: mode ? 'Choisir usager' : 'Usager',
				type: 'select',
				edit: mode,
				defaultValue: this.state.intervention.customerId,
				changeHandler: this.changeHandler('customerId'),
				values: this._buildCustomers(),
				validator: Validators.NonNull
			},
			{
				title: '',
				type: 'select',
				edit: true,
				defaultValue: this.state.intervention.period,
				changeHandler: this.changeHandler('period'),
				values: Period.PERIODS,
				validator: Validators.NonNull	
			}
		], []];
	}

	_buildBottomInfos() {
		let period = Period.getPeriod(this.state.intervention.period);
		let startDate = {
			title: 'Début',
			type: 'date',
			edit: true,
			defaultValue: this.state.intervention.startDate,
			changeHandler: this.changeHandler('startDate'),
			validator: Validators.NonNull
		};
		let endDate = {
			title: 'Début',
			type: 'date',
			edit: true,
			defaultValue: this.state.intervention.endDate,
			changeHandler: this.changeHandler('endDate'),
			validator: period !== Period.ONE ? Validators.NonNull : null
		};
		let startTime = {
			title: 'De',
			type: 'time',
			edit: true,
			defaultValue: this.state.intervention.startTime,
			changeHandler: this.changeHandler('startTime'),
			validator: Validators.NonNull
		};
		let endTime = {
			title: 'A',
			type: 'time',
			edit: true,
			defaultValue: this.state.intervention.endTime,
			changeHandler: this.changeHandler('endTime'),
			validator: Validators.NonNull
		};
		let days = {
			title: 'Jours',
			type: 'selectMulti',
			edit: true,
			defaultValue: this.state.intervention.days,
			changeHandler: this.changeHandler('days'),
			validator: period !== Period.ONE ? Validators.NonEmptyArray : null,
			values: Day.DAYS			
		};
		
		switch (period)	{
			case Period.ONE:
				return [[ startDate, startTime, endTime ], [] ];
			case Period.P1W:
			case Period.P2W:
			case Period.P3W:
			case Period.P4W:
				return [[ startDate, endDate, startTime, endTime ], [ days ] ];
		}
	}

	render() {
		let mode = (this.state.mode === MODES.CREATE);
		return (
			<Row>
				<Form horizontal>
					<Panel header={(<strong>{mode ? 'Saisir une nouvelle demande' : 'Modifier demande'}</strong>)}>
						<Row>
							{FormBuilder.buildFormGroups(this._buildTopInfos())}
						</Row>
						<Row>
							{FormBuilder.buildFormGroups(this._buildBottomInfos())}
						</Row>
						<ButtonsEndDialog 
							onOk={this.onSaveIntervention.bind(this)} 
							okTitle='Enregistrer modifications' 
							okDisabled={!this.state.validationState}
							onCancel={this.onCancel.bind(this)} 
							cancelTitle='Annuler'/>
					</Panel>
				</Form>
				</Row>
		);
	}
}

export default ServiceInterventionEdit;