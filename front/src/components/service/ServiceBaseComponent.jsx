import React from 'react';
// Core modules
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

class ServiceBaseComponent extends React.Component {

	// Constructor //
	// --------------------------------------------------------------------------------

	constructor(props) {
		super(props);
		this.loginStore = StoreRegistry.getStore('LOGIN_STORE');
		this.serviceStore = StoreRegistry.getStore('SERVICE_STORE');
	}


	// Basic sotre access //
	// --------------------------------------------------------------------------------

	_getLoginData(path) {
		return this.loginStore.getData(path);
	}
	_getServiceData(path) {
		return this.serviceStore.getData(path);
	}
	_getBaseArgs() {
		return {
			token: this.getLoginData('/token'),
			serviceId: this.getLoginData('/userId')
		}
	}


	// Login //
	// --------------------------------------------------------------------------------

	getLoginData(path) {
		return this._getLoginData(path ? path : '/');
	}


	// Service //
	// --------------------------------------------------------------------------------

	getServiceData(path) {
		return this._getServiceData(path ? path : '/');
	}
	getService() {
		return this._getServiceData('/data/service');
	}

	loadService() {
		return Dispatcher.issue('GET_SERVICE', this._getBaseArgs());
	}	
	updateService(service) {
		let args = this._getBaseArgs();
		args.data = service;
		return Dispatcher.issue('PUT_SERVICE', args);
	}
	

	// Customers //
	// --------------------------------------------------------------------------------

	getCustomers() {
		return this._getServiceData('/data/customers');
	}
	getCustomer(id) {
		return this._getServiceData('/data/customers/' + id);
	}

	loadCustomers() {
		return Dispatcher.issue('GET_SERVICE_CUSTOMERS', this._getBaseArgs());
	}
	createCustomer(customer) {
		let args = this._getBaseArgs();
		args.data = customer;
		return Dispatcher.issue('POST_CUSTOMER', args).
		then(this.loadCustomers.bind(this));
	}
	updateCustomer(customer) {
		let args = this._getBaseArgs();
		args.data = customer;
		args.customerId = customer.id;
		return Dispatcher.issue('PUT_CUSTOMER', args).
		then(this.loadCustomers.bind(this));
	}
	deleteCustomer(id) {
		let args = this._getBaseArgs();
		args.customerId = id;
		return Dispatcher.issue('DELETE_CUSTOMER', args).
		then(this.loadCustomers.bind(this));
	}


	// Auxiliaries //
	// --------------------------------------------------------------------------------

	getAuxiliaries() {
		return this._getServiceData('/data/auxiliaries');
	}
	getAuxiliary(id) {
		return this._getServiceData('/data/auxiliaries/' + id);
	}

	loadAuxiliaries() {
		return Dispatcher.issue('GET_SERVICE_AUXILIARIES', this._getBaseArgs());
	}	


	// Interventions //
	// --------------------------------------------------------------------------------

	getInterventions() {
		return this._getServiceData('/data/interventions');
	}
	getIntervention(id) {
		return this._getServiceData('/data/interventions/' + id);
	}

	loadInterventions() {
		return Dispatcher.issue('GET_SERVICE_INTERVENTIONS', this._getBaseArgs());
	}
	createIntervention(intervention) {
		let args = this._getBaseArgs();
		args.data = intervention;
		return Dispatcher.issue('POST_INTERVENTION', args).
		then(this.loadInterventions.bind(this));
	}
	updateIntervention(intervention) {
		let args = this._getBaseArgs();
		args.data = intervention;
		args.interventionId = intervention.id;
		return Dispatcher.issue('PUT_INTERVENTION', args).
		then(this.loadInterventions.bind(this));
	}
	deleteIntervention(id) {
		let args = this._getBaseArgs();
		args.interventionId = id;
		return Dispatcher.issue('DELETE_INTERVENTION', args).
		then(this.loadInterventions.bind(this));
	}


	// Offers //
	// --------------------------------------------------------------------------------

	getOffers() {
		return this._getServiceData('/data/offers');
	}
	getOffer(id) {
		return this._getServiceData('/data/offers/' + id);
	}

	loadOffers() {
		return Dispatcher.issue('GET_SERVICE_OFFERS', this._getBaseArgs());
	}	
	createOffer(offer) {
		let args = this._getBaseArgs();
		args.data = offer;
		return Dispatcher.issue('POST_OFFER', args);
	}
	updateOffer(offer) {
		let args = this._getBaseArgs();
		args.data = offer;
		args.offerId = offer.id;
		return Dispatcher.issue('PUT_OFFER', args).
		then(this.loadOffers.bind(this));
	}


	// Dummy renderer //
	// --------------------------------------------------------------------------------

	render() {
		return('');
	}
}

export default ServiceBaseComponent;
