// Import core modules
import ActionBase from '../core/ActionBase.js';
import StoreRegistry from '../core/StoreRegistry';
// Import utilities module
import Utils from '../utils/Utils.js';
// Import services modules
import RestService from '../services/rest/RestService.js';

// GET CUSTOMER
let GetCustomer = new ActionBase({ name: 'GET_CUSTOMER' });
GetCustomer.do = function (args) {
	Utils.checkMembers(args, ['id', 'token']);
	let customer = StoreRegistry.getStore('CUSTOMER_STORE').getCustomer(args.id);
	if (customer && !args.refresh) {
		return new Promise(function(resolve) {
			resolve(customer);
		});
	} else {
		var params = {
			token: args.token,
			id: args.id
		};
		return RestService.getCustomer(params);
	}
}