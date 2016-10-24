import React from 'react';
// Core modules
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

class AuxiliaryBaseComponent extends React.Component {

	constructor(props) {
		super(props);
		this.loginStore = StoreRegistry.getStore('LOGIN_STORE');
		this.auxiliaryStore = StoreRegistry.getStore('AUXILIARY_STORE');
	}

	// Basic sotre access //

	_getLoginData(path) {
		return this.loginStore.getData(path);
	}
	_getAuxiliaryData(path) {
		return this.auxiliaryStore.getData(path);
	}

	// Login //

	getLoginData(path) {
		return this._getLoginData(path ? path : '/');
	}

	// Auxiliary //

	getAuxiliary() {
		return this._getAuxiliaryData('/data/auxiliary');
	}
	
	// Customers //

	getCustomers() {
		return this._getAuxiliaryData('/data/customers');
	}
	getCustomer(id) {
		return this._getAuxiliaryData('/data/customers/' + id);
	}

	// Services //

	getServices() {
		return this._getAuxiliaryData('/data/services');
	}
	getService(id) {
		return this._getAuxiliaryData('/data/services/' + id);
	}

	// Interventions //

	getInterventions() {
		return this._getAuxiliaryData('/data/interventions');
	}
	getIntervention(id) {
		return this._getAuxiliaryData('/data/interventions/' + id);
	}

	// Offers //

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
		then(function () {
			return Dispatcher.issue('GET_AUXILIARY_OFFERS', { 
				token: this.getLoginData('/token'),
				auxiliaryId: this.getLoginData('/id')
			})
		}.bind(this));
	}

	// Geo Zones //

	getGeoZones() {
		return this._getAuxiliaryData('/data/geoZones');
	}
	getGeoZone(index) {
		return this._getAuxiliaryData('/data/geoZones/' + index);
	}

	// Dummy renderer //

	render() {
		return('');
	}
}

export default AuxiliaryBaseComponent;
