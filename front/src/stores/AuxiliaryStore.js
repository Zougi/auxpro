import Dispatcher from '../core/Dispatcher.js';
import StoreBase from '../core/StoreBase.js';
import StoreRegistry from '../core/StoreRegistry';

var DEFAULT_CONTENT = { auxiliaries: [],  auxiliary: {}};

var AuxiliaryStore = new StoreBase ({ 
	name: 'AUXILIARY_STORE',
	content: DEFAULT_CONTENT
});

// GET AUXILIARIES
AuxiliaryStore.onGetAuxiliaries = function (args) {
	AuxiliaryStore._content.auxiliaries = args;
	AuxiliaryStore.notify();
};
Dispatcher.register('GET_AUXILIARIES', AuxiliaryStore.onGetAuxiliaries);

// GET AUXILIARY
// PUT AUXILIARY
AuxiliaryStore.onGetAuxiliary = function (args) {
	AuxiliaryStore._content.auxiliary[args.id] = args;
	AuxiliaryStore.notify();
};
Dispatcher.register('GET_AUXILIARY', AuxiliaryStore.onGetAuxiliary);
Dispatcher.register('PUT_AUXILIARY', AuxiliaryStore.onGetAuxiliary);

// GET AUXILIARY SERVICES
AuxiliaryStore.onGetAuxiliaryServices = function (result, param) {
	if (result && result.length) {
		let auxiliary = AuxiliaryStore._content.auxiliary[param.auxiliaryId];
		auxiliary.services = result;	
		auxiliary.servicesLoaded = true;
		AuxiliaryStore.notify();
	}
}
Dispatcher.register('GET_AUXILIARY_SERVICES', AuxiliaryStore.onGetAuxiliaryServices);

// GET AUXILIARY CUSTOMERS
AuxiliaryStore.onGetAuxiliaryCustomers = function (result, param) {
	if (result && result.length) {
		let auxiliary = AuxiliaryStore._content.auxiliary[param.auxiliaryId];
		auxiliary.customers = result;	
		auxiliary.customersLoaded = true;
		AuxiliaryStore.notify();
	}
}
Dispatcher.register('GET_AUXILIARY_CUSTOMERS', AuxiliaryStore.onGetAuxiliaryCustomers);

// GET AUXILIARY OFFERS
AuxiliaryStore.onGetAuxiliaryOffers = function (result, param) {
	if (result && result.length) {
		let auxiliary = AuxiliaryStore._content.auxiliary[param.auxiliaryId];
		auxiliary.offers = result;	
		auxiliary.offersLoaded = true;
		AuxiliaryStore.notify();
	}
}
Dispatcher.register('GET_AUXILIARY_OFFERS', AuxiliaryStore.onGetAuxiliaryOffers);

// GET AUXILIARY INTERVENTIONS
AuxiliaryStore.onGetAuxiliaryInterventions = function (result, param) {
	if (result && result.length) {
		let auxiliary = AuxiliaryStore._content.auxiliary[param.auxiliaryId];
		auxiliary.interventions = result;	
		auxiliary.interventionsLoaded = true;
		AuxiliaryStore.notify();
	}
}
Dispatcher.register('GET_AUXILIARY_INTERVENTIONS', AuxiliaryStore.onGetAuxiliaryInterventions);

// GET AUXILIARY INDISPONIBILITIES
AuxiliaryStore.onGetAuxiliaryIndisponibilities = function (result, param) {
	if (result && result.length) {
		let auxiliary = AuxiliaryStore._content.auxiliary[param.auxiliaryId];
		auxiliary.indisponibilities = result;	
		auxiliary.indisponibilitiesLoaded = true;
		AuxiliaryStore.notify();
	}
}
Dispatcher.register('GET_AUXILIARY_INDISPONIBILITIES', AuxiliaryStore.onGetAuxiliaryIndisponibilities);

// GET AUXILIARY GEOZONES
AuxiliaryStore.onGetAuxiliaryGeoZones = function (args) {
	let user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
	if (args.geoZones && args.geoZones.length > 0) {
		AuxiliaryStore._content.auxiliary[user.id].geoZones = args.geoZones;
		AuxiliaryStore.notifyPath('auxiliary/geoZones');
	}	
};
Dispatcher.register('GET_AUXILIARY_GEOZONES', AuxiliaryStore.onGetAuxiliaryGeoZones);

export default AuxiliaryStore;