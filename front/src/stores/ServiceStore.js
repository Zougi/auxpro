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
	ServiceStore._content.service[args.id] = args;
	ServiceStore.notify();
};
Dispatcher.register('GET_SERVICE', ServiceStore.onGetService);

// GET SERVICE CUSTOMERS
ServiceStore.onGetServiceCustomers = function (args) {
	console.log('customers');
	console.log(args);
	if (args && args.length) {
		ServiceStore._content.service[args[0].serviceId].customers = args;	
		ServiceStore.notify();
	}	
};
Dispatcher.register('GET_SERVICE_CUSTOMERS', ServiceStore.onGetServiceCustomers);

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