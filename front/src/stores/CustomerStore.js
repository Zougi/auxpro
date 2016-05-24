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

export default CustomerStore;