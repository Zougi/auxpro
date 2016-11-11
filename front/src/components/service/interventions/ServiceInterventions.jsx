// lib modules
import React from 'react';
import { Panel, Button, Row, Col } from 'react-bootstrap';
// core modules
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';
import Utils from 'utils/Utils.js'
// custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent.jsx'
import ServiceInterventionsCustomer from './ServiceInterventionsCustomer.jsx';
import DialogConfirmation from 'components-lib/DialogConfirmation/DialogConfirmation.jsx';

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
			interventions: this.getInterventions(),
			offers: this.getOffers()
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
		let interventions = Utils.filter(this.state.interventions, function(intervention) {
			return intervention.customerId === customer.id;
		});
		let offers = Utils.filter(this.state.offers, function(offer) {
			return offer.customerId === customer.id;
		});
		return (
			<ServiceInterventionsCustomer
				key={customer.id}
				customer={customer}
				interventions={interventions}
				offers={offers}
				onEdit={this.onEditIntervention.bind(this)}
				onMatch={this.onMatchIntervention.bind(this)}
				onDelete={this.onDeleteIntervention.bind(this)}
				onViewOffers={this.onViewIntervention.bind(this)} />
		);
	}

	render() { return (
		<Row>
			<Panel header={(<strong>Prestations & Offres en cours</strong>)} bsStyle='warning'>
				<Button block bsStyle='info' onClick={this.onAddIntervention.bind(this)}>
					Saisir nouvelle prestation
				</Button>
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