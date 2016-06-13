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

ServiceStore.onGetService = function (args) {
	ServiceStore._content.service[args.id] = args;
	ServiceStore.notify();
};

Dispatcher.register('GET_SERVICE', ServiceStore.onGetService);

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