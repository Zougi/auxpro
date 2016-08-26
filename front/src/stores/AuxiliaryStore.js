import Dispatcher from 'core/Dispatcher.js';
import StoreBase from 'core/StoreBase.js';
import StoreRegistry from 'core/StoreRegistry';

var DEFAULT_CONTENT = { auxiliaries: [],  auxiliary: {}};

var AuxiliaryStore = new StoreBase ({ 
	name: 'AUXILIARY_STORE',
	content: DEFAULT_CONTENT
});

AuxiliaryStore.getAuxiliary = function (auxiliaryId) {
	let auxiliary = AuxiliaryStore._content.auxiliary[auxiliaryId] || {};
	AuxiliaryStore._content.auxiliary[auxiliaryId] = auxiliary;
	return auxiliary;
};

// LOGOUT
AuxiliaryStore.onLogout = function (result, param) {
	AuxiliaryStore._content = DEFAULT_CONTENT;
};
Dispatcher.register('LOGOUT', AuxiliaryStore.onLogout);

// GET AUXILIARY
// PUT AUXILIARY
AuxiliaryStore.onGetAuxiliary = function (result, param) {
	let auxiliary = AuxiliaryStore.getAuxiliary(param.auxiliaryId);
	auxiliary.auxiliary = result || {};
	auxiliary.auxiliaryLoaded = true;
	AuxiliaryStore.notify();
};
Dispatcher.register('GET_AUXILIARY', AuxiliaryStore.onGetAuxiliary);
Dispatcher.register('PUT_AUXILIARY', AuxiliaryStore.onGetAuxiliary);

// POST AUXILIARY QUESTIONNARY
AuxiliaryStore.onPostAuxiliaryQuestionary = function (result, param) {
	if (result) {
		let auxiliary = AuxiliaryStore._content.auxiliary[param.auxiliaryId];
		auxiliary.auxiliary.skills = result;
		AuxiliaryStore.notify();
	}
}
Dispatcher.register('POST_AUXILIARY_QUESTIONARY', AuxiliaryStore.onPostAuxiliaryQuestionary);

// GET AUXILIARY SERVICES
AuxiliaryStore.onGetAuxiliaryServices = function (result, param) {
	if (result && result.length) {
		let auxiliary = AuxiliaryStore._content.auxiliary[param.auxiliaryId];
		auxiliary.services = {};
		for (let i = 0; i < result.length; i++) {
			let service = result[i];
			auxiliary.services[service.id] = service;
		}
		auxiliary.servicesLoaded = true;
		AuxiliaryStore.notify();
	}
}
Dispatcher.register('GET_AUXILIARY_SERVICES', AuxiliaryStore.onGetAuxiliaryServices);

// GET AUXILIARY CUSTOMERS
AuxiliaryStore.onGetAuxiliaryCustomers = function (result, param) {
	let auxiliary = AuxiliaryStore.getAuxiliary(param.auxiliaryId);
	auxiliary.customers = {};
	if (result && result.length) {
		for (let i = 0; i < result.length; i++) {
			let customer = result[i];
			auxiliary.customers[customer.id] = customer;
		}
	}
	auxiliary.customersLoaded = true;
	AuxiliaryStore.notify();
}
Dispatcher.register('GET_AUXILIARY_CUSTOMERS', AuxiliaryStore.onGetAuxiliaryCustomers);

// GET AUXILIARY OFFERS
AuxiliaryStore.onGetAuxiliaryOffers = function (result, param) {
	let auxiliary = AuxiliaryStore.getAuxiliary(param.auxiliaryId);
	auxiliary.offers = {};
	if (result && result.length) {
		for (let i = 0; i < result.length; i++) {
			let offer = result[i];
			auxiliary.offers[offer.id] = offer;
			auxiliary.customers[offer.customerId].type = auxiliary.customers[offer.customerId].type || 'offer';
		}
	}
	auxiliary.offersLoaded = true;
	AuxiliaryStore.notify();
}
Dispatcher.register('GET_AUXILIARY_OFFERS', AuxiliaryStore.onGetAuxiliaryOffers);

// GET AUXILIARY INTERVENTIONS
AuxiliaryStore.onGetAuxiliaryInterventions = function (result, param) {
	let auxiliary = AuxiliaryStore.getAuxiliary(param.auxiliaryId);
	auxiliary.interventions = {};
	if (result && result.length) {
		for (let i = 0; i < result.length; i++) {
			let intervention = result[i];
			auxiliary.interventions[intervention.id] = intervention;
			auxiliary.customers[intervention.customerId].type = 'intervention';
		}
	}
	auxiliary.interventionsLoaded = true;
	AuxiliaryStore.notify();
}
Dispatcher.register('GET_AUXILIARY_INTERVENTIONS', AuxiliaryStore.onGetAuxiliaryInterventions);

// GET AUXILIARY INDISPONIBILITIES
AuxiliaryStore.onGetAuxiliaryIndisponibilities = function (result, param) {
	let auxiliary = AuxiliaryStore.getAuxiliary(param.auxiliaryId);
	auxiliary.indisponibilities = {};
	if (result && result.length) {
		for (let i = 0; i < result.length; i++) {
			let indisponibility = result[i];
			auxiliary.indisponibilities[indisponibility.id] = indisponibility;
		}
	}
	auxiliary.indisponibilitiesLoaded = true;
	AuxiliaryStore.notify();
}
Dispatcher.register('GET_AUXILIARY_INDISPONIBILITIES', AuxiliaryStore.onGetAuxiliaryIndisponibilities);

// GET AUXILIARY GEOZONES
AuxiliaryStore.onGetAuxiliaryGeoZones = function (result, param) {
	//let user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
	let auxiliary = AuxiliaryStore.getAuxiliary(param.auxiliaryId);
	auxiliary.geoZones = result.geoZones || [];
	auxiliary.geoZonesLoaded = true;
	AuxiliaryStore.notify();
};
Dispatcher.register('GET_AUXILIARY_GEOZONES', AuxiliaryStore.onGetAuxiliaryGeoZones);

export default AuxiliaryStore;