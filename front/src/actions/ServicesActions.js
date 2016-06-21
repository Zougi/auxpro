// Import core modules
import ActionBase from '../core/ActionBase.js';
import StoreRegistry from '../core/StoreRegistry';
// Import utilities module
import Utils from '../utils/Utils.js';
// Import services modules
import RestService from '../services/rest/RestService.js';

// GET SERVICES
let GetServices = new ActionBase({ name: 'GET_SERVICES' });
GetServices.do = function (args) {
	Utils.checkMembers(args, ['token']);
	return RestService.getServices(args);
}

// POST SERVICE
let PostService = new ActionBase({ name: 'POST_SERVICE' });
PostService.do = function (args) {
	Utils.checkMembers(args, ['name', 'password', 'email']);
	var params = {
		token: Utils.encode('guest', 'guest'),
		data: args
	};
	return RestService.postService(params);
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
		var params = {
			token: args.token,
			id: args.id
		};
		return RestService.getService(params);
	}
}

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

// GET SERVICE CUSTOMERS
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