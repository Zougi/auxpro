import Dispatcher from 'core/Dispatcher.js';
import StoreBase from 'core/StoreBase.js';
import StoreRegistry from 'core/StoreRegistry';

import Utils from '../utils/Utils.js';

var DEFAULT_CONTENT = { 
	data: {},
	display: {
		home: {
			showUserHeader: false
		}
	}
};

var ServiceStore = new StoreBase ({ 
	name: 'SERVICE_STORE',
	content: DEFAULT_CONTENT
});

/* ACCESS HELPERS */

ServiceStore.getService = function (id) {
	return ServiceStore._content.service[id];
};

/* ACTION LISTENERS */
//------------------------------------------------------------

// ROUTER_CHANGED
ServiceStore.navigate = function (result, param) {
	if (result === '/home/edit') {
		ServiceStore.getContent().display.home.showUserHeader = false;
	} else {
		ServiceStore.getContent().display.home.showUserHeader = true;
	}
	ServiceStore.notify('/display/home/showUserHeader');
};
Dispatcher.register('NAVIGATE', ServiceStore.navigate);

// LOGOUT
ServiceStore.onLogout = function (result, param) {
	ServiceStore.setContent(DEFAULT_CONTENT);
};
Dispatcher.register('LOGOUT', ServiceStore.onLogout);

// GET/PUT SERVICE
ServiceStore.onGetService = function (result, param) {
	ServiceStore.getContent().data.service = result;
	ServiceStore.getContent().data.serviceLoaded = true;
	ServiceStore.notify();
};
Dispatcher.register('GET_SERVICE', ServiceStore.onGetService);
Dispatcher.register('PUT_SERVICE', ServiceStore.onGetService);

// GET SERVICE CUSTOMERS
ServiceStore.onGetServiceCustomers = function (result, param) {
	let data = ServiceStore.getContent().data;
	let previous = data.customers || {};
	data.customers = {};
	if (result && result.length) {
		var l = result.length;
		for (let i = 0; i < l; i++) {
			let customer = result[i];
			// store customer
			data.customers[customer.id] = customer;
			// Replug previous links
			if (previous[customer.id] && previous[customer.id].interventions) {
				data.customers[customer.id].interventions = previous[customer.id].interventions;
			}
		}
	}
	data.customersLoaded = true;
	ServiceStore.notify();
};
Dispatcher.register('GET_SERVICE_CUSTOMERS', ServiceStore.onGetServiceCustomers);

// GET SERVICE INTERVENTIONS
ServiceStore.onGetServiceInterventions = function (result, param) {
	let data = ServiceStore.getContent().data;
	let previous = data.interventions || {};
	data.interventions = {};
	let customers = Utils.map(data.customers);
	var cl = customers.length;
	for (let c = 0; c < cl; c++) {
		delete customers[c].interventions;
	}
	if (result && result.length) {
		var l = result.length;
		for (let i = 0; i < l; i++) {
			let intervention = result[i];
			// Store intervention
			data.interventions[intervention.id] = intervention;
			// Store link in customer
			data.customers[intervention.customerId].interventions = data.customers[intervention.customerId].interventions || [];
			data.customers[intervention.customerId].interventions.push(intervention.id);
			// Replug previous links
			if (previous[intervention.id] && previous[intervention.id].offers) {
				data.interventions[intervention.id].offer = previous[intervention.id].offers;
			}
		}
	}
	data.interventionsLoaded = true;
	ServiceStore.notify();
};
Dispatcher.register('GET_SERVICE_INTERVENTIONS', ServiceStore.onGetServiceInterventions);

// GET SERVICE OFFERS
ServiceStore.onGetServiceOffers = function (result, param) {
	let data = ServiceStore.getContent().data;
	data.offers = {};
	if (result && result.length) {
		var l = result.length;
		for (let i = 0; i < l; i++) {
			let offer = result[i];
			// store offer
			data.offers[offer.id] = offer;
			// Store link in intervention
			let intervention = data.interventions[offer.interventionId];
			if (intervention) {
				intervention.offers = intervention.offers || [];
				intervention.offers.push(offer.id);
			}
		}
	}
	data.offersLoaded = true;
	ServiceStore.notify();

};
Dispatcher.register('GET_SERVICE_OFFERS', ServiceStore.onGetServiceOffers);

// GET SERVICE AUXILIARIES
ServiceStore.onGetServiceAuxiliries = function (result, param) {
	let data = ServiceStore.getContent().data;
	data.auxiliaries = {};
	if (result && result.length) {
		var l = result.length;
		for (let i = 0; i < l; i++) {
			let auxiliary = result[i];
			// store auxiliary
			data.auxiliaries[auxiliary.id] = auxiliary;
		}
	}
	data.auxiliariesLoaded = true;
	ServiceStore.notify();
};
Dispatcher.register('GET_SERVICE_AUXILIARIES', ServiceStore.onGetServiceAuxiliries);

// GET INTERVENTION MATCH
ServiceStore.onGetInterventionMatch = function (result, param) {
	let data = ServiceStore.getContent().data;
	if (result && result.length > 0) {
		// Store link in intervention
		let intervention = data.interventions[param.interventionId];
		if (intervention) {
			intervention.matches = result;
		}
	}
};
Dispatcher.register('GET_INTERVENTION_MATCH', ServiceStore.onGetInterventionMatch);

export default ServiceStore;