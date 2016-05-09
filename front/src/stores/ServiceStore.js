import Dispatcher from '../core/Dispatcher.js';
import StoreBase from '../core/StoreBase.js';

var DEFAULT_CONTENT = { services: [] };

var ServiceStore = new StoreBase ({ 
	name: 'SERVICE_STORE',
	content: DEFAULT_CONTENT
});

ServiceStore.onGetServices = function (args) {
	ServiceStore._content.services = args;
	ServiceStore.notify();
};

Dispatcher.register('GET_SERVICES', ServiceStore.onGetServices);

export default ServiceStore;