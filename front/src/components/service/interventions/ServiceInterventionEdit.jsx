// lib modules
import React from 'react'
import moment from 'moment'
import { Panel, Button, Row, Col, Clearfix, Form } from 'react-bootstrap'
// core modules
import Dispatcher from 'core/Dispatcher'
import StoreRegistry from 'core/StoreRegistry'
// custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent'
import FormSelect from 'components-lib/Form/FormSelect'
import InterventionDetailsOneTime from 'components/common/interventions/InterventionDetailsOneTime'
import InterventionDetailsRecurence from 'components/common/interventions/InterventionDetailsRecurence'
import ButtonsEndDialog from 'components-lib/ButtonsEndDialog/ButtonsEndDialog'
// Lib modules
import Utils from 'utils/Utils'
import MomentHelper from 'utils/moment/MomentHelper'
import InterventionHelper from 'utils/entities/InterventionHelper'

moment.locale('fr')

let MODES = {
	CREATE: 'CREATE',
	EDIT: 'EDIT'
}

let INTERVENTION_MODES = {
	ONE_TIME: { 
		key: 'ONE_TIME',
		value: 'Intervention unique'
	},
	RECURENCE: {
		key: 'RECURENCE',
		value: 'Intervention récurente'
	}
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
				interventionMode: intervention.oneTime ? INTERVENTION_MODES.ONE_TIME : INTERVENTION_MODES.RECURENCE,
				intervention: intervention,
				validationState: InterventionHelper.checkValidation(intervention),
			};
		} else {
			let customers = Utils.map(this.getCustomers());
			return {
				mode: MODES.CREATE,
				customers: customers,
				interventionMode: INTERVENTION_MODES.ONE_TIME,
				intervention: {
					serviceId: this.getLoginData('/id'),
					customerId: customers[0].id,
					oneTime: this._getDefaultOneTime(),
					recurence: this._getDefaultRecurence()
				},
				validationState: false
			};
		}
	}
	_getDefaultOneTime() {
		return {
			date: MomentHelper.toLocalDate(moment())
		}
	}
	_getDefaultRecurence() {
		return {
			startDate: MomentHelper.toLocalDate(moment()),
			endDate: MomentHelper.toLocalDate(moment()),
			period: 'P1W'
		}
	}


	// Callbacks functions //
	// --------------------------------------------------------------------------------

	onSaveIntervention() {
		if (this.state.interventionMode === INTERVENTION_MODES.ONE_TIME) {
			delete this.state.intervention.recurence;
		} else {
			delete this.state.intervention.oneTime;
		}
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

	onCustomerChanged(customerId) {
		this.state.intervention.customerId = customerId;
		this._setValidationState();
	}
	onInterventionModeChanged(modeId) {
		this.state.interventionMode = INTERVENTION_MODES[modeId];
		if (this.state.interventionMode === INTERVENTION_MODES.ONE_TIME) {
			this.state.intervention.oneTime = this.state.intervention.oneTime || this._getDefaultOneTime();
		} else {
			this.state.intervention.recurence = this.state.intervention.recurence || this._getDefaultRecurence();
		}
		this._setValidationState();
	}
	onOneTimeChanged(oneTime) {
		this.state.intervention.oneTime = oneTime;
		this._setValidationState();
	}
	onRecurenceChanged(recurence) {
		this.state.intervention.recurence = recurence;
		this._setValidationState();
	}
	_setValidationState() {
		if (this.state.interventionMode === INTERVENTION_MODES.ONE_TIME) {
			this.setState({ validationState: InterventionHelper.checkValidationOneTime(this.state.intervention) });
		} else {
			this.setState({ validationState: InterventionHelper.checkValidationRecurence(this.state.intervention) });
		}
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

	render() {
		let mode = (this.state.mode === MODES.CREATE);
		return (
			<Row>
				<Form horizontal>
					<Panel header={(<strong>{mode ? 'Saisir une nouvelle demande' : 'Modifier demande'}</strong>)}>
						<Row>
							<Col sm={6}>
								<FormSelect 
									edit={mode}
									title={mode ? 'Choisir client' : 'Client'}
									defaultValue={this.state.intervention.customerId}
									values={this._buildCustomers()}
									onChange={this.onCustomerChanged.bind(this)}/>
								<FormSelect 
									edit={true}
									title='Type de demande'
									defaultValue={this.state.interventionMode.key} 
									values={[ INTERVENTION_MODES.ONE_TIME, INTERVENTION_MODES.RECURENCE ]}
									onChange={this.onInterventionModeChanged.bind(this)}/>
							</Col>
						</Row>
						<Row>
							{this.state.interventionMode === INTERVENTION_MODES.ONE_TIME ?
							<InterventionDetailsOneTime
								edit={true}
								onChange={this.onOneTimeChanged.bind(this)}
								date={this.state.intervention.oneTime.date}
								startTime={this.state.intervention.oneTime.startTime}
								endTime={this.state.intervention.oneTime.endTime} />
							:
							<InterventionDetailsRecurence
								edit={true}
								onChange={this.onRecurenceChanged.bind(this)}
								startDate={this.state.intervention.recurence.startDate}
								endDate={this.state.intervention.recurence.endDate}
								startTime={this.state.intervention.recurence.startTime}
								endTime={this.state.intervention.recurence.endTime}
								period={this.state.intervention.recurence.period}
								days={this.state.intervention.recurence.days}/>
							}
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