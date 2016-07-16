import ActionBase from '../core/ActionBase.js';
import Utils from '../utils/Utils.js';
import RestService from '../services/rest/RestService.js';

/* **
 * HELPERS **
 * */

function getCustomerUrl(customerId) {
	return '/customers/' + (customerId ? customerId : '');
}

/* **
 * SERVICES **
 * */

// POST SERVICE CUSTOMER
let PostCustomer = new ActionBase({ name: 'POST_CUSTOMER' });
PostCustomer.do = function (args) {
	Utils.checkMembers(args, ['data', 'token']);
	var reqParam = {
		url   : getCustomerUrl(),
		method: 'POST',
		data  : args.data,
		token : args.token
	};
	return RestService._request(reqParam);
}

// DELETE SERVICE CUSTOMER
let GetCustomer = new ActionBase({ name: 'GET_CUSTOMER' });
GetCustomer.do = function (args) {
	Utils.checkMembers(args, ['customerId', 'token']);
	var reqParam = {
		url   : getCustomerUrl(args.customerId),
		token : args.token
	};
	return RestService._request(reqParam);
}

// PUT SERVICE CUSTOMER
let PutCustomer = new ActionBase({ name: 'PUT_CUSTOMER' });
PutCustomer.do = function (args) {
	Utils.checkMembers(args, ['customerId', 'data', 'token']);
	var reqParam = {
		url   : getCustomerUrl(args.customerId),
		method: 'PUT',
		data  : args.data,
		token : args.token
	};
	return RestService._request(reqParam);
}

// DELETE SERVICE CUSTOMER
let DeleteCustomer = new ActionBase({ name: 'DELETE_CUSTOMER' });
DeleteCustomer.do = function (args) {
	Utils.checkMembers(args, ['customerId', 'token']);
	var reqParam = {
		url   : getCustomerUrl(args.customerId),
		method: 'DELETE',
		token : args.token
	};
	return RestService._request(reqParam);
}

// GET CUSTOMER INTERVENTIONS
let GetCustomerInterventions = new ActionBase({ name: 'GET_CUSTOMER_INTERVENTIONS' });
GetCustomerInterventions.do = function (args) {
	Utils.checkMembers(args, ['customerId', 'token']);
	var reqParam = {
		url   : getCustomerUrl(args.customerId) + '/interventions',
		token : args.token
	};
	return RestService._request(reqParam);
}
