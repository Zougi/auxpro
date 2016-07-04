// core modules
import Dispatcher from '../core/Dispatcher.js';
import StoreBase from '../core/StoreBase.js';

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
		ServiceStore._content.service[sId].interventions = args;
		for (let i = 0 ; i < args.length ; i++) {
			let interv = args[i];
			let cId = interv.customerId;
			let customers = ServiceStore._content.service[sId].customers;
			for (let c = 0 ; c < customers.length ; c++) {
				let customer = customers[c];
				if (customer.id === cId) {
					customer.interventions = customer.interventions || [];
					customer.interventions.push(interv);
					break;
				}
			}
			
		}
		ServiceStore.notify();
		ServiceStore._content.service[sId].interventionsLoaded = true;
	}
};
Dispatcher.register('GET_SERVICE_INTERVENTIONS', ServiceStore.onGetServiceInterventions);

// GET AUXILIARY MISSIONS
ServiceStore.onGetAuxiliaryMissions = function (args) {
	if (args && args.services) {
		for (let sId in args.services) {
			 if (args.services.hasOwnProperty(sId)) {
			 	ServiceStore._content.service[args.id] = args.services[sId];
			 }
		}
	}
	ServiceStore.notify();
};
Dispatcher.register('GET_AUXILIARY_MISSIONS', ServiceStore.onGetAuxiliaryMissions);

export default ServiceStore;