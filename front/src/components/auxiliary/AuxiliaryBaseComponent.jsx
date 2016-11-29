import React from 'react'
// Core modules
import Dispatcher from 'core/Dispatcher'
import StoreRegistry from 'core/StoreRegistry'

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
			auxiliaryId: this.getLoginData('/userId')
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
	getAuxiliaryData(path) {
		return this._getAuxiliaryData(path ? path : '/');
	}
	getAuxiliary() {
		return this._getAuxiliaryData('/data/auxiliary');
	}
	updateAuxiliary(auxiliary) {
		let args = this._getBaseArgs();
		args.data = auxiliary;
		return Dispatcher.issue('PUT_AUXILIARY', args);
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
	loadAllServices() {
		return Dispatcher.issue('GET_SERVICES', this._getBaseArgs());
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
		let args = this._getBaseArgs();
		args.data = offer;
		args.offerId = offer.id;
		return Dispatcher.issue('PUT_OFFER', args).
		then(this.loadOffers.bind(this));
	}


	// Missions //
	// --------------------------------------------------------------------------------

	loadMissions() {
		return Dispatcher.issue('GET_AUXILIARY_MISSIONS', this._getBaseArgs());
	}
	getMissions() {
		return this._getAuxiliaryData('/data/missions');
	}
	getMission(id) {
		return this._getAuxiliaryData('/data/missions/' + id);
	}
	updateMission(mission) {
		let args = this._getBaseArgs();
		args.data = mission;
		args.missionId = mission.id;
		return Dispatcher.issue('PUT_MISSION', args);
	}


	// Indisponibilities //
	// --------------------------------------------------------------------------------

	getIndisponibilities() {
		return this._getAuxiliaryData('/data/indisponibilities');
	}
	getIndisponibility(id) {
		return this._getAuxiliaryData('/data/indisponibilities/' + id);
	}

	loadIndisponibilities() {
		return Dispatcher.issue('GET_AUXILIARY_INDISPONIBILITIES', this._getBaseArgs());
	}
	createIndisponibility(indisponibility) {
		let args = this._getBaseArgs();
		args.data = indisponibility;
		return Dispatcher.issue('POST_INDISPONIBILITY', args);
	}
	updateIndisponibility(indisponibility) {
		let args = this._getBaseArgs();
		args.indisponibilityId = indisponibility.id;
		args.data = indisponibility;
		return Dispatcher.issue('PUT_INDISPONIBILITY', args);
	}
	deleteIndisponibility(id) {
		let args = this._getBaseArgs();
		args.indisponibilityId = id;
		return Dispatcher.issue('DELETE_INDISPONIBILITY', args);
	}


	// Questionary //
	// --------------------------------------------------------------------------------

	postQuestionary(answers) {
		let args = this._getBaseArgs();
		args.data = answers;
		return Dispatcher.issue('POST_AUXILIARY_QUESTIONARY', args)
	}


	// Geo Zones //
	// --------------------------------------------------------------------------------

	getGeozones() {
		return this._getAuxiliaryData('/data/geozones');
	}
	getGeozone(id) {
		return this._getAuxiliaryData('/data/geozones/' + id);
	}
	
	loadGeozones() {
		return Dispatcher.issue('GET_AUXILIARY_GEOZONES', this._getBaseArgs());
	}
	loadGeozone(id) {
		var args = this._getBaseArgs();
		args.geozoneId = gz.id;
		return Dispatcher.issue('GET_GEOZONE', args);
	}
	createGeozone(geozone) {
		var args = this._getBaseArgs();
		geozone.auxiliaryId = args.auxiliaryId;
		args.data = geozone;
		return Dispatcher.issue('POST_GEOZONE', args);
	}
	updateGeozone(geozone) {
		var args = {};
		args.token = this._getBaseArgs().token;
		args.geozoneId = geozone.id;
		args.data = geozone;
		return Dispatcher.issue('PUT_GEOZONE', args);
	}
	deleteGeozone(id) {
		var args = this._getBaseArgs();
		args.geozoneId = id;
		return Dispatcher.issue('DELETE_GEOZONE', args);
	}

	// Dummy renderer //

	render() {
		return('');
	}
}
export default AuxiliaryBaseComponent;