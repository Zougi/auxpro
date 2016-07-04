// Import core modules
import ActionBase from '../core/ActionBase.js';
import StoreRegistry from '../core/StoreRegistry';
// Import utilities module
import Utils from '../utils/Utils.js';
// Import services modules
import RestService from '../services/rest/RestService.js';

/* **
 * SERVICES **
 * */

// GET SERVICES
let GetServices = new ActionBase({ name: 'GET_SERVICES' });
GetServices.do = function (args) {
	Utils.checkMembers(args, ['token']);
	var reqParam = {
		url   : '/services',
		token : args.token
	};
	return RestService._request(reqParam);
}

// GET SERVICE
let GetService = new ActionBase({ name: 'GET_SERVICE' });
GetService.do = function (args) {
	Utils.checkMembers(args, ['id', 'token']);
	let service = StoreRegistry.getStore('SERVICE_STORE').getData('/service/' + args.id);
	if (service && !args.refresh) {
		return new Promise(function(resolve) {
			resolve(service);
		});
	} else {
		var reqParam = {
			url   : '/services/' + args.id,
			token : args.token
		};
		return RestService._request(reqParam);
	}
}

// POST SERVICE
let PostService = new ActionBase({ name: 'POST_SERVICE' });
PostService.do = function (args) {
	Utils.checkMembers(args, ['name', 'password', 'email']);
	var reqParam = {
		url   : '/services' + args.sId + '/customers/',
		data: args,
		method: 'POST',
		token : args.token
	};
	return RestService._request(reqParam);
}

// PUT SERVICE
let PutService = new ActionBase({ name: 'PUT_SERVICE' });
PutService.do = function (args) {
	Utils.checkMembers(args, ['id', 'data', 'token']);
	var reqParam = {
		url   : '/services/' + args.sId,
		method: 'PUT',
		data  : args.data,
		token : args.token
	};
	return RestService._request(reqParam);
}

/* **
 * CUSTOMERS **
 * */

// GET SERVICE CUSTOMERS
let GetServiceCustomers = new ActionBase({ name: 'GET_SERVICE_CUSTOMERS' });
GetServiceCustomers.do = function (args) {
	Utils.checkMembers(args, ['sId', 'token']);
	var reqParam = {
		url   : '/services/' + args.sId + '/customers/',
		token : args.token
	};
	return RestService._request(reqParam);
}

// POST SERVICE CUSTOMER
let PostServiceCustomer = new ActionBase({ name: 'POST_SERVICE_CUSTOMER' });
PostServiceCustomer.do = function (args) {
	Utils.checkMembers(args, ['sId', 'data', 'token']);
	var reqParam = {
		url   : '/services/' + args.sId + '/customers/',
		method: 'POST',
		data  : args.data,
		token : args.token
	};
	return RestService._request(reqParam);
}

// PUT SERVICE CUSTOMER
let PutServiceCustomer = new ActionBase({ name: 'PUT_SERVICE_CUSTOMER' });
PutServiceCustomer.do = function (args) {
	Utils.checkMembers(args, ['sId', 'data', 'token']);
	var reqParam = {
		url   : '/services/' + args.sId + '/customers/' + args.data.id,
		method: 'PUT',
		data  : args.data,
		token : args.token
	};
	return RestService._request(reqParam);
}

// DELETE SERVICE CUSTOMER
let DeleteServiceCustomer = new ActionBase({ name: 'DELETE_SERVICE_CUSTOMER' });
DeleteServiceCustomer.do = function (args) {
	Utils.checkMembers(args, ['sId', 'cId', 'token']);
	var reqParam = {
		url   : '/services/' + args.sId + '/customers/' + args.cId,
		method: 'DELETE',
		token : args.token
	};
	return RestService._request(reqParam);
}

/* **
 * INTERVENTIONS **
 * */

// GET SERVICE INTERVENTIONS
let GetServiceInterventions = new ActionBase({ name: 'GET_SERVICE_INTERVENTIONS' });
GetServiceInterventions.do = function (args) {
	Utils.checkMembers(args, ['sId', 'token']);
	var reqParam = {
		url   : '/services/' + args.sId + '/interventions/',
		token : args.token
	};
	return RestService._request(reqParam);
}

// GET SERVICE CUSTOMER INTERVENTIONS
let GetServiceCustomerInterventions = new ActionBase({ name: 'GET_SERVICE_CUSTOMER_INTERVENTIONS' });
GetServiceCustomerInterventions.do = function (args) {
	Utils.checkMembers(args, ['sId', 'cId', 'token']);
	var reqParam = {
		url   : '/services/' + args.sId + '/customers/' + args.cId + '/interventions',
		token : args.token
	};
	return RestService._request(reqParam);
}

// POST SERVICE CUSTOMER INTERVENTION
let PostServiceCustomerInterventions = new ActionBase({ name: 'POST_SERVICE_CUSTOMER_INTERVENTION' });
PostServiceCustomerInterventions.do = function (args) {
	Utils.checkMembers(args, ['sId', 'cId', 'data', 'token']);
	var reqParam = {
		url   : '/services/' + args.sId + '/customers/' + args.cId + '/interventions',
		data: args.data,
		method: 'POST',
		token : args.token
	};
	return RestService._request(reqParam);
}

// PUT SERVICE CUSTOMER INTERVENTION
let PutServiceCustomerInterventions = new ActionBase({ name: 'PUT_SERVICE_CUSTOMER_INTERVENTION' });
PutServiceCustomerInterventions.do = function (args) {
	Utils.checkMembers(args, ['sId', 'cId', 'iId', 'data', 'token']);
	var reqParam = {
		url   : '/services/' + args.sId + '/customers/' + args.cId + '/interventions/' + args.iId,
		data: args.data,
		method: 'PUT',
		token : args.token
	};
	return RestService._request(reqParam);
}

// DELETE SERVICE CUSTOMER INTERVENTION
let DeleteServiceCustomerInterventions = new ActionBase({ name: 'DELETE_SERVICE_CUSTOMER_INTERVENTION' });
DeleteServiceCustomerInterventions.do = function (args) {
	Utils.checkMembers(args, ['sId', 'cId', 'iId', 'token']);
	var reqParam = {
		url   : '/services/' + args.sId + '/customers/' + args.cId + '/interventions/' + args.iId,
		method: 'DELETE',
		token : args.token
	};
	return RestService._request(reqParam);
}