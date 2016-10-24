import React from 'react';
// Core modules
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

class AuxiliaryBaseComponent extends React.Component {

	// Constructor //
	// --------------------------------------------------------------------------------

	constructor(props) {
		super(props);
		this.loginStore = StoreRegistry.getStore('LOGIN_STORE');
		this.auxiliaryStore = StoreRegistry.getStore('AUXILIARY_STORE');
	}


	// Basic sotre access //
	// --------------------------------------------------------------------------------

	_getLoginData(path) {
		return this.loginStore.getData(path);
	}
	_getAuxiliaryData(path) {
		return this.auxiliaryStore.getData(path);
	}
	_getBaseArgs() {
		return { 
			token: this.getLoginData('/token'),
			auxiliaryId: this.getLoginData('/id')
		}
	}


	// Login //
	// --------------------------------------------------------------------------------

	getLoginData(path) {
		return this._getLoginData(path ? path : '/');
	}


	// Auxiliary //
	// --------------------------------------------------------------------------------

	loadAuxiliary() {
		return Dispatcher.issue('GET_AUXILIARY', this._getBaseArgs());
	}
	getAuxiliary() {
		return this._getAuxiliaryData('/data/auxiliary');
	}
	

	// Customers //
	// --------------------------------------------------------------------------------

	loadCustomers() {
		return Dispatcher.issue('GET_AUXILIARY_CUSTOMERS', this._getBaseArgs());
	}
	getCustomers() {
		return this._getAuxiliaryData('/data/customers');
	}
	getCustomer(id) {
		return this._getAuxiliaryData('/data/customers/' + id);
	}


	// Services //
	// --------------------------------------------------------------------------------

	loadServices() {
		return Dispatcher.issue('GET_AUXILIARY_SERVICES', this._getBaseArgs());
	}
	getServices() {
		return this._getAuxiliaryData('/data/services');
	}
	getService(id) {
		return this._getAuxiliaryData('/data/services/' + id);
	}


	// Interventions //
	// --------------------------------------------------------------------------------

	loadInterventions() {
		return Dispatcher.issue('GET_AUXILIARY_INTERVENTIONS', this._getBaseArgs());
	}
	getInterventions() {
		return this._getAuxiliaryData('/data/interventions');
	}
	getIntervention(id) {
		return this._getAuxiliaryData('/data/interventions/' + id);
	}


	// Offers //
	// --------------------------------------------------------------------------------

	loadOffers() {
		return Dispatcher.issue('GET_AUXILIARY_OFFERS', this._getBaseArgs());
	}
	getOffers() {
		return this._getAuxiliaryData('/data/offers');
	}
	getOffer(id) {
		return this._getAuxiliaryData('/data/offers/' + id);
	}
	updateOffer(offer) {
		return Dispatcher.issue('PUT_OFFER', {
			data: offer,
			offerId: offer.id,
			token: this.getLoginData('/token')
		}).
		then(this.loadOffers.bind(this));
	}


	// Indisponibilities //
	// --------------------------------------------------------------------------------

	loadIndisponibilities() {
		return Dispatcher.issue('GET_AUXILIARY_INDISPONIBILITIES', this._getBaseArgs());
	}
	getIndisponibilities() {
		return this._getAuxiliaryData('/data/indisponibilities');
	}
	getIndisponibility(id) {
		return this._getAuxiliaryData('/data/indisponibilities/' + id);
	}


	// Geo Zones //
	// --------------------------------------------------------------------------------

	loadGeozones() {
		return Dispatcher.issue('GET_AUXILIARY_GEOZONES', this._getBaseArgs());
	}
	getGeoZones() {
		return this._getAuxiliaryData('/data/geoZones');
	}
	getGeoZone(index) {
		return this._getAuxiliaryData('/data/geoZones/' + index);
	}
	createGeozone(gz) {
	}
	deleteGeozone(gz) {
	}

	// Dummy renderer //

	render() {
		return('');
	}
}

export default AuxiliaryBaseComponent;
