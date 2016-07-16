// core modules
import Dispatcher from '../core/Dispatcher.js';
import StoreBase from '../core/StoreBase.js';
import StoreRegistry from '../core/StoreRegistry';
// custom modules
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
ServiceStore.onGetServiceCustomers = function (args) {
	if (args && args.length) {
		let sId = args[0].serviceId;
		ServiceStore._content.service[sId].customers = args;	
		ServiceStore.notify();
		ServiceStore._content.service[sId].customersLoaded = true;
	}	
};
Dispatcher.register('GET_SERVICE_CUSTOMERS', ServiceStore.onGetServiceCustomers);

// GET SERVICE INTERVENTIONS
ServiceStore.onGetServiceInterventions = function (args) {
	if (args && args.length) {
		let sId = args[0].serviceId;
		ServiceStore._content.service[sId].interventions = {};
		for (let i = 0 ; i < args.length ; i++) {
			let interv = args[i];
			let cId = interv.customerId;
			ServiceStore._content.service[sId].interventions[cId] = ServiceStore._content.service[sId].interventions[cId] || [];
			ServiceStore._content.service[sId].interventions[cId].push(interv);
		}
		ServiceStore.notify();
		ServiceStore._content.service[sId].interventionsLoaded = true;
	}
};
Dispatcher.register('GET_SERVICE_INTERVENTIONS', ServiceStore.onGetServiceInterventions);

// GET SERVICE OFFERS
ServiceStore.onGetServiceOffers = function (args) {
	if (args && args.length) {
		let serviceId = args[0].serviceId;
		let service = ServiceStore._content.service[serviceId];
		service.offers = {};
		for (let i = 0 ; i < args.length ; i++) {
			let offer = args[i];
			let interventionId = offer.interventionId;
			service.offers[interventionId] = service.offers[interventionId] || [];
			service.offers[interventionId].push(offer);
		}
		ServiceStore.notify();
		service.offersLoaded = true;
	}
};
Dispatcher.register('GET_SERVICE_OFFERS', ServiceStore.onGetServiceOffers);

// GET INTERVENTION MATCH
ServiceStore.onGetInterventionMatch = function (args, actionParams) {
	if (args && args.length > 0) {
		let user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
		let service = ServiceStore._content.service[user.id];
		service.matches = service.matches || {};
		service.matches[actionParams.interventionId] = args;
		ServiceStore.notifyPath("service/matches");
	}
};
Dispatcher.register('GET_INTERVENTION_MATCH', ServiceStore.onGetInterventionMatch);

export default ServiceStore;