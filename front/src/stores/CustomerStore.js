// core modules
import Dispatcher from '../core/Dispatcher.js';
import StoreBase from '../core/StoreBase.js';

var DEFAULT_CONTENT = { customer: {} };

var CustomerStore = new StoreBase ({ 
	name: 'CUSTOMER_STORE',
	content: DEFAULT_CONTENT
});

CustomerStore.getCustomer = function (id) {
	return CustomerStore._content.customer[id];
}

CustomerStore.onGetCustomer = function (args) {
	CustomerStore._content.customer[args.id] = args;
	CustomerStore.notify();
};

Dispatcher.register('GET_CUSTOMER', CustomerStore.onGetCustomer); 

CustomerStore.onGetAuxiliaryMissions = function (args) {
	if (args && args.customers) {
		for (let cId in args.customers) {
			if (args.customers.hasOwnProperty(cId)) {
				CustomerStore._content.customer[args.id] = args.customers[cId];
			}
		}
	}
	CustomerStore.notify();
};

Dispatcher.register('GET_AUXILIARY_MISSIONS', CustomerStore.onGetAuxiliaryMissions);

export default CustomerStore;