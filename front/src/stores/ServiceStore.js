import Dispatcher from 'core/Dispatcher.js';
import StoreBase from 'core/StoreBase.js';
import StoreRegistry from 'core/StoreRegistry';

import Utils from '../utils/Utils.js';

var DEFAULT_CONTENT = { services: [], service: {} };

var ServiceStore = new StoreBase ({ 
	name: 'SERVICE_STORE',
	content: DEFAULT_CONTENT
});

/* ACCESS HELPERS */

ServiceStore.getService = function (id) {
	return ServiceStore._content.service[id];
};

/* ACTION LISTENERS */

// LOGOUT
ServiceStore.onLogout = function (result, param) {
	ServiceStore._content = DEFAULT_CONTENT;
};
Dispatcher.register('LOGOUT', ServiceStore.onLogout);

// GET SERVICES
ServiceStore.onGetServices = function (args) {
	ServiceStore._content.services = args;
	let l = args.length;
	for (let i = 0; i < l; i++) {
		let serv = args[i];
		ServiceStore._content.service[serv.id] = serv;
	}
	ServiceStore.notify();
};
Dispatcher.register('GET_SERVICES', ServiceStore.onGetServices);

// GET SERVICE
ServiceStore.onGetService = function (args) {
	let sId = args.id;
	ServiceStore._content.service[sId] = ServiceStore._content.service[sId] || {};
	ServiceStore._content.service[sId].service = args;
	ServiceStore._content.service[sId].serviceLoaded = true;
	ServiceStore.notify();
};
Dispatcher.register('GET_SERVICE', ServiceStore.onGetService);

// GET SERVICE CUSTOMERS
ServiceStore.onGetServiceCustomers = function (result, param) {
	let service = ServiceStore._content.service[param.serviceId];
	let previous = service.customers || {};
	service.customers = {};
	if (result && result.length) {
		for (let i = 0; i < result.length; i++) {
			let customer = result[i];
			// store customer
			service.customers[customer.id] = customer;
			// Replug previous links
			if (previous[customer.id] && previous[customer.id].interventions) {
				service.customers[customer.id].interventions = previous[customer.id].interventions;
			}
		}
	}
	service.customersLoaded = true;
	ServiceStore.notify();
};
Dispatcher.register('GET_SERVICE_CUSTOMERS', ServiceStore.onGetServiceCustomers);

// GET SERVICE INTERVENTIONS
ServiceStore.onGetServiceInterventions = function (result, param) {
	let service = ServiceStore._content.service[param.serviceId];
	let previous = service.interventions || {};
	service.interventions = {};
	let customers = Utils.map(service.customers);
	for (let c = 0; c < customers.length; c++) {
		delete customers[c].interventions;
	}
	if (result && result.length) {
		for (let i = 0; i < result.length; i++) {
			let intervention = result[i];
			// Store intervention
			service.interventions[intervention.id] = intervention;
			// Store link in customer
			service.customers[intervention.customerId].interventions = service.customers[intervention.customerId].interventions || [];
			service.customers[intervention.customerId].interventions.push(intervention.id);
			// Replug previous links
			if (previous[intervention.id] && previous[intervention.id].offers) {
				service.interventions[intervention.id].offer = previous[intervention.id].offers;
			}
		}
	}
	service.interventionsLoaded = true;
	ServiceStore.notify();
};
Dispatcher.register('GET_SERVICE_INTERVENTIONS', ServiceStore.onGetServiceInterventions);

// GET SERVICE OFFERS
ServiceStore.onGetServiceOffers = function (result, param) {
	let service = ServiceStore._content.service[param.serviceId];
	service.offers = {};
	if (result && result.length) {
		for (let i = 0; i < result.length; i++) {
			let offer = result[i];
			// store offer
			service.offers[offer.id] = offer;
			// Store link in intervention
			let intervention = service.interventions[offer.interventionId];
			if (intervention) {
				intervention.offers = intervention.offers || [];
				intervention.offers.push(offer.id);
			}
		}
	}
	service.offersLoaded = true;
	ServiceStore.notify();

};
Dispatcher.register('GET_SERVICE_OFFERS', ServiceStore.onGetServiceOffers);

// GET SERVICE AUXILIARIES
ServiceStore.onGetServiceAuxiliries = function (result, param) {
	let service = ServiceStore._content.service[param.serviceId];
	service.auxiliaries = {};
	if (result && result.length) {
		for (let i = 0; i < result.length; i++) {
			let auxiliary = result[i];
			// store auxiliary
			service.auxiliaries[auxiliary.id] = auxiliary;
		}
	}
	service.auxiliariesLoaded = true;
	ServiceStore.notify();
};
Dispatcher.register('GET_SERVICE_AUXILIARIES', ServiceStore.onGetServiceAuxiliries);

// GET INTERVENTION MATCH
ServiceStore.onGetInterventionMatch = function (result, param) {
	let service = ServiceStore._content.service[StoreRegistry.getStore('LOGIN_STORE').getData('/id')];
	if (result && result.length > 0) {
		// Store link in intervention
		let intervention = service.interventions[param.interventionId];
		if (intervention) {
			intervention.matches = result;
		}
	}
};
Dispatcher.register('GET_INTERVENTION_MATCH', ServiceStore.onGetInterventionMatch);

export default ServiceStore;