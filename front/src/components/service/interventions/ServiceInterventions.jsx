import React from 'react'
import { Panel, Row, Col, Clearfix } from 'react-bootstrap'
// Core modules
import Dispatcher from 'core/Dispatcher'
import StoreRegistry from 'core/StoreRegistry'
// Custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent'
import APPanelBasic from 'components-lib/Panel/APPanelBasic'
import DialogConfirmation from 'components-lib/DialogConfirmation/DialogConfirmation'
import { APButton } from 'ap-react-bootstrap'
// Lib modules
import Utils from 'utils/Utils'
import MomentHelper from 'utils/moment/MomentHelper'
import InterventionHelper from 'utils/entities/InterventionHelper'
import Day from 'utils/constants/Day'
import InterventionType from 'utils/constants/InterventionType'
import Period from 'utils/constants/Period'

class ServiceInterventions extends ServiceBaseComponent {

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
		return { 
			customers: this.getCustomers(),
			interventions: this.getInterventions()
		};
	}


	// Callbacks functions //
	// --------------------------------------------------------------------------------

	onViewIntervention(intervention) {
		Dispatcher.issue('NAVIGATE', {path: '/sad/interventions/' + intervention.id});
	}
	onAddIntervention() {
		Dispatcher.issue('NAVIGATE', {path: '/sad/interventions/new' });
	}
	onEditIntervention(intervention) {
		Dispatcher.issue('NAVIGATE', {path: '/sad/interventions/' + intervention.id + '/edit' });
	}
	onMatchIntervention(intervention) {
		Dispatcher.issue('GET_INTERVENTION_MATCH', {
			token: this.getLoginData('/token'),
			interventionId: intervention.id
		}).then(function() {
			Dispatcher.issue('NAVIGATE', {path: '/sad/interventions/' + intervention.id });
		}).
		catch(function (error) {
			console.log('Unable to load matches:');
			console.log(error);
		});
	}
	onDeleteIntervention(intervention) {
		this.setState({
			interventionToDelete: intervention.id,
			showDeleteConfirm: true
		});
	}
	doDeleteIntervention() {
		this.deleteIntervention(this.state.interventionToDelete).
		then(function () {
			return this.loadInterventions();
		}.bind(this)).
		then(function () {
			return this.loadCustomers();
		}.bind(this)).
		then(function () {
			return this.loadAuxiliaries();
		}.bind(this)).
		then(function () {
			this.cancelDeleteIntervention();
		}.bind(this));
	}
	cancelDeleteIntervention() {
		this.setState({
			interventionToDelete: null,
			showDeleteConfirm: false
		});
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildCustomers() {
		let customers = Utils.filter(this.state.customers || [], this._filterCustomer.bind(this));
		return customers.map(this._buildCustomer.bind(this));
	}
	_filterCustomer(customer) {
		return customer.interventions && customer.interventions.length;
	}
	_buildCustomer(customer) {
		let interventionsPending = [];
		let interventionsOffered = [];
		let interventionsPlanned = [];
		let l = customer.interventions.length;
		for (let i = 0; i < l; i++) {
			let intervention = this.getIntervention(customer.interventions[i]);
			let type = InterventionType.getFromIntervention(intervention);
			switch (type) {
				case InterventionType.PENDING:
					interventionsPending.push(intervention);
					break;
				case InterventionType.OFFERED:
					interventionsOffered.push(intervention);
					break;
				case InterventionType.PLANNED:
					interventionsPlanned.push(intervention);
					break;
			}
		}
		return (
			<Panel key={customer.id} header={customer.lastName + ' ' + customer.firstName}>
				<Row>
					{this._buildInterventionsPending(interventionsPending)}
				</Row>
				<Row>
					{this._buildInterventionsOffered(interventionsOffered)}
				</Row>
				<Row>
					{this._buildInterventionsPlanned(interventionsPlanned)}
				</Row>
			</Panel>
		);
	}

	_buildInterventionsPending(interventions) {
		return interventions.map(function(intervention, i) {
			let text = InterventionHelper.getInitialText(intervention);
			let actions = [
				{
					tooltip: 'Editer prestation',
					bsStyle: 'info', 
					glyph: 'pencil', 
					callback: this.onEditIntervention.bind(this, intervention)
				},
				{
					tooltip: 'Envoyer offre',
					bsStyle: 'success', 
					glyph: 'upload', 
					callback: this.onMatchIntervention.bind(this, intervention)
				},
				{
					tooltip: 'Supprimer prestation',
					bsStyle: 'danger', 
					glyph: 'remove', 
					callback: this.onDeleteIntervention.bind(this, intervention)
				}
			]
			return (
				<Col key={i} sm={6} md={4}>
					<APPanelBasic 
						actions={actions}
						title='Prestation'
						text={text}/>
				</Col>
			);
		}.bind(this));
	}

	_buildInterventionsOffered(interventions) {
		return interventions.map(function(intervention, i) {
			let text = InterventionHelper.getInitialText(intervention);
			let actions = [
				{
					tooltip: 'Etat des offres',
					bsStyle: 'info', 
					glyph: 'cloud-upload', 
					callback: this.onViewIntervention.bind(this, intervention)
				}
			]
			return (
				<Col key={i} sm={6} md={4}>
					<APPanelBasic
						bsStyle='info'
						actions={actions}
						title={'Offre (' + intervention.offers.length + ')'}
						text={text}/>
				</Col>
			);
		}.bind(this));
	}

	_buildInterventionsPlanned(interventions) {
		return interventions.map(function(intervention, i) {
			let auxiliary = this.getAuxiliary(intervention.auxiliaryId);
			let text = InterventionHelper.getInitialText(intervention);
			text.push('Assurée par '+ auxiliary.civility + ' ' + auxiliary.lastName + ' ' + auxiliary.firstName);
			return (
				<Col key={i} sm={6} md={4}>
					<APPanelBasic 
						bsStyle='success'
						title='Intervention'
						text={text}/>
				</Col>
			);
		}.bind(this));
	}

	render() { return (
		<Row>
			<Panel header={(<strong>Prestations & Offres en cours</strong>)} bsStyle='warning'>
				<APButton
					block
					bsStyle='info'
					text='Saisir nouvelle prestation'
					onClick={this.onAddIntervention.bind(this)} />
				<br/>
				{this._buildCustomers()}
			</Panel>
			<DialogConfirmation
				show={this.state.showDeleteConfirm}
				title='Supprimer prestation ?'
				onConfirm={this.doDeleteIntervention.bind(this)}
				confirmStyle='danger'
				confirmText='Supprimer'
				onCancel={this.cancelDeleteIntervention.bind(this)}
				cancelStyle='default'
				cancelText='Annuler' />
		</Row>
	);}
}

export default ServiceInterventions;