import Dispatcher from 'core/Dispatcher.js';
import StoreBase from 'core/StoreBase.js';
import StoreRegistry from 'core/StoreRegistry';

var DEFAULT_CONTENT = {
	data: {},
	display: {
		home: {
			showUserHeader: true
		}
	}
};

var AuxiliaryStore = new StoreBase ({ 
	name: 'AUXILIARY_STORE',
	content: DEFAULT_CONTENT
});

AuxiliaryStore.getAuxiliary = function (auxiliaryId) {
	let auxiliary = AuxiliaryStore._content.auxiliary[auxiliaryId] || {};
	AuxiliaryStore._content.auxiliary[auxiliaryId] = auxiliary;
	return auxiliary;
};


/* ACTIONS CALLBACKS */
//------------------------------------------------------------

// ROUTER_CHANGED
AuxiliaryStore.navigate = function (result, param) {
	if (result === '/aux/edit') {
		AuxiliaryStore.getContent().display.home.showUserHeader = false;
	} else {
		AuxiliaryStore.getContent().display.home.showUserHeader = true;
	}
	AuxiliaryStore.notifyPath('/display/home/showUserHeader');
};
Dispatcher.register('NAVIGATE', AuxiliaryStore.navigate);

// LOGOUT
AuxiliaryStore.onLogout = function (result, param) {
	AuxiliaryStore.setContent(DEFAULT_CONTENT);
	AuxiliaryStore.notify('/');
};
Dispatcher.register('LOGOUT', AuxiliaryStore.onLogout);

// GET AUXILIARY
// PUT AUXILIARY
AuxiliaryStore.onGetAuxiliary = function (result, param) {
	AuxiliaryStore.getContent().data.auxiliary = result || {};
	AuxiliaryStore.getContent().data.auxiliaryLoaded = true;
	AuxiliaryStore.notify('/data/auxiliary');
};
Dispatcher.register('GET_AUXILIARY', AuxiliaryStore.onGetAuxiliary);
Dispatcher.register('PUT_AUXILIARY', AuxiliaryStore.onGetAuxiliary);

// GET AUXILIARY SERVICES
AuxiliaryStore.onGetAuxiliaryServices = function (result, param) {
	let data = AuxiliaryStore.getContent().data;
	data.services = {};
	if (result && result.length) {
		let l = result.length;
		for (let i = 0; i < l; i++) {
			let service = result[i];
			data.services[service.id] = service;
		}
	}
	data.servicesLoaded = true;
	AuxiliaryStore.notify('/data/services');
}
Dispatcher.register('GET_AUXILIARY_SERVICES', AuxiliaryStore.onGetAuxiliaryServices);

// GET AUXILIARY CUSTOMERS
AuxiliaryStore.onGetAuxiliaryCustomers = function (result, param) {
	let data = AuxiliaryStore.getContent().data;
	data.customers = {};
	if (result && result.length) {
		let l = result.length;
		for (let i = 0; i < l; i++) {
			let customer = result[i];
			data.customers[customer.id] = customer;
		}
	}
	data.customersLoaded = true;
	AuxiliaryStore.notify();
}
Dispatcher.register('GET_AUXILIARY_CUSTOMERS', AuxiliaryStore.onGetAuxiliaryCustomers);

// GET AUXILIARY OFFERS
AuxiliaryStore.onGetAuxiliaryOffers = function (result, param) {
	let data = AuxiliaryStore.getContent().data;
	data.offers = {};
	if (result && result.length) {
		let l = result.length;
		for (let i = 0; i < l; i++) {
			let offer = result[i];
			data.offers[offer.id] = offer;
			data.customers[offer.customerId].type = data.customers[offer.customerId].type || 'offer';
		}
	}
	data.offersLoaded = true;
	AuxiliaryStore.notify();
}
Dispatcher.register('GET_AUXILIARY_OFFERS', AuxiliaryStore.onGetAuxiliaryOffers);

// GET AUXILIARY INTERVENTIONS
AuxiliaryStore.onGetAuxiliaryInterventions = function (result, param) {
	let data = AuxiliaryStore.getContent().data;
	data.interventions = {};
	if (result && result.length) {
		let l = result.length;
		for (let i = 0; i < l; i++) {
			let intervention = result[i];
			data.interventions[intervention.id] = intervention;
			data.customers[intervention.customerId].type = 'intervention';
		}
	}
	data.interventionsLoaded = true;
	AuxiliaryStore.notify();
}
Dispatcher.register('GET_AUXILIARY_INTERVENTIONS', AuxiliaryStore.onGetAuxiliaryInterventions);

// GET AUXILIARY INDISPONIBILITIES
AuxiliaryStore.onGetAuxiliaryIndisponibilities = function (result, param) {
	let data = AuxiliaryStore.getContent().data;
	data.indisponibilities = {};
	if (result && result.length) {
		let l = result.length;
		for (let i = 0; i < l; i++) {
			let indisponibility = result[i];
			data.indisponibilities[indisponibility.id] = indisponibility;
		}
	}
	data.indisponibilitiesLoaded = true;
	AuxiliaryStore.notify();
}
Dispatcher.register('GET_AUXILIARY_INDISPONIBILITIES', AuxiliaryStore.onGetAuxiliaryIndisponibilities);

// GET AUXILIARY GEOZONES
AuxiliaryStore.onGetAuxiliaryGeoZones = function (result, param) {
	let data = AuxiliaryStore.getContent().data;
	data.geoZones = result.geoZones || [];
	data.geoZonesLoaded = true;
	AuxiliaryStore.notify();
};
Dispatcher.register('GET_AUXILIARY_GEOZONES', AuxiliaryStore.onGetAuxiliaryGeoZones);

export default AuxiliaryStore;