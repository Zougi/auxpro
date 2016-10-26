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
			serviceId: this.getLoginData('/id')
		}
	}


	// Login //
	// --------------------------------------------------------------------------------

	getLoginData(path) {
		return this._getLoginData(path ? path : '/');
	}


	// Service //
	// --------------------------------------------------------------------------------

	loadService() {
		return Dispatcher.issue('GET_SERVICE', this._getBaseArgs());
	}
	updateService(service) {
		let args = this._getBaseArgs();
		args.data = service;
		return Dispatcher.issue('PUT_SERVICE', args);
	}
	getService() {
		return this._getServiceData('/data/service');
	}
	

	// Customers //
	// --------------------------------------------------------------------------------

	loadCustomers() {
		return Dispatcher.issue('GET_SERVICE_CUSTOMERS', this._getBaseArgs());
	}
	getCustomers() {
		return this._getServiceData('/data/customers');
	}
	getCustomer(customerId) {
		return this._getServiceData('/data/customers/' + customerId);
	}
	createCustomer(customer) {
		return Dispatcher.issue('POST_CUSTOMER', {
			data: customer,
			token: this.getLoginData('/token')
		}).
		then(this.loadCustomers.bind(this));
	}
	updateCustomer(customer) {
		return Dispatcher.issue('PUT_CUSTOMER', {
			data: customer,
			customerId: customer.id,
			token: this.getLoginData('/token')
		}).
		then(this.loadCustomers.bind(this));
	}
	deleteCustomer(customerId) {
		return Dispatcher.issue('DELETE_CUSTOMER', {
			customerId: customerId,
			token: this.getLoginData('/token')
		}).
		then(this.loadCustomers.bind(this));
	}


	// Auxiliaries //
	// --------------------------------------------------------------------------------

	loadAuxiliaries() {
		return Dispatcher.issue('GET_SERVICE_AUXILIARIES', this._getBaseArgs());
	}
	getAuxiliaries() {
		return this._getServiceData('/data/auxiliaries');
	}
	getAuxiliary(id) {
		return this._getServiceData('/data/auxiliaries/' + id);
	}


	// Interventions //
	// --------------------------------------------------------------------------------

	loadInterventions() {
		return Dispatcher.issue('GET_SERVICE_INTERVENTIONS', this._getBaseArgs());
	}
	getInterventions() {
		return this._getServiceData('/data/interventions');
	}
	getIntervention(interventionId) {
		return this._getServiceData('/data/interventions/' + interventionId);
	}
	deleteIntervention(interventionId) {
		let args = this._getBaseArgs();
		args.interventionId = interventionId;
		return Dispatcher.issue('DELETE_INTERVENTION', args);
	}


	// Offers //
	// --------------------------------------------------------------------------------

	loadOffers() {
		return Dispatcher.issue('GET_SERVICE_OFFERS', this._getBaseArgs());
	}
	getOffers() {
		return this._getServiceData('/data/offers');
	}
	getOffer(id) {
		return this._getServiceData('/data/offers/' + id);
	}
	createOffer(offer) {
		return Dispatcher.issue('POST_OFFER', {
			data: offer,
			token: this.getLoginData('/token')
		});
	}
	updateOffer(offer) {
		return Dispatcher.issue('PUT_OFFER', {
			data: offer,
			offerId: offer.id,
			token: this.getLoginData('/token')
		}).
		then(this.loadOffers.bind(this));
	}


	// Dummy renderer //
	// --------------------------------------------------------------------------------

	render() {
		return('');
	}
}

export default ServiceBaseComponent;
