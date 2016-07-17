import ActionBase from '../core/ActionBase.js';
import Utils from '../utils/Utils.js';
import RestService from '../services/rest/RestService.js';

/* **
 * SERVICES **
 * */

function getServiceUrl(serviceId) {
	return '/services/' + (serviceId ? serviceId  : '');
}

/* **
 * SERVICES **
 * */

// GET SERVICES
let GetServices = new ActionBase({ name: 'GET_SERVICES' });
GetServices.do = function (args) {
	Utils.checkMembers(args, ['token']);
	var reqParam = {
		url   : getServiceUrl(),
		token : args.token
	}; 
	return RestService._request(reqParam);
}

// GET SERVICE
let GetService = new ActionBase({ name: 'GET_SERVICE' });
GetService.do = function (args) {
	Utils.checkMembers(args, ['serviceId', 'token']);
	var reqParam = {
		url   : getServiceUrl(args.serviceId),
		token : args.token
	};
	return RestService._request(reqParam);
}

// POST SERVICE
let PostService = new ActionBase({ name: 'POST_SERVICE' });
PostService.do = function (args) {
	Utils.checkMembers(args, ['name', 'password', 'email']);
	var reqParam = {
		url   : getServiceUrl(),
		method: 'POST',
		data: args,
		token : Utils.encode('guest', 'guest')
	};
	return RestService._request(reqParam);
}

// PUT SERVICE
let PutService = new ActionBase({ name: 'PUT_SERVICE' });
PutService.do = function (args) {
	Utils.checkMembers(args, ['serviceId', 'data', 'token']);
	var reqParam = {
		url   : getServiceUrl(args.serviceId),
		method: 'PUT',
		data  : args.data,
		token : args.token
	};
	return RestService._request(reqParam);
}

// GET SERVICE CUSTOMERS
let GetServiceCustomers = new ActionBase({ name: 'GET_SERVICE_CUSTOMERS' });
GetServiceCustomers.do = function (args) {
	Utils.checkMembers(args, ['serviceId', 'token']);
	var reqParam = {
		url   : getServiceUrl(args.serviceId) + '/customers',
		token : args.token
	};
	return RestService._request(reqParam);
}

// GET SERVICE INTERVENTIONS
let GetServiceInterventions = new ActionBase({ name: 'GET_SERVICE_INTERVENTIONS' });
GetServiceInterventions.do = function (args) {
	Utils.checkMembers(args, ['serviceId', 'token']);
	var reqParam = {
		url   : getServiceUrl(args.serviceId) + '/interventions',
		token : args.token
	};
	return RestService._request(reqParam);
}

// GET SERVICE OFFERS
let GetServiceOffers = new ActionBase({ name: 'GET_SERVICE_OFFERS' });
GetServiceOffers.do = function (args) {
	Utils.checkMembers(args, ['serviceId', 'token']);
	var reqParam = {
		url   : getServiceUrl(args.serviceId) + '/offers',
		token : args.token
	};
	return RestService._request(reqParam);
}

// GET SERVICE AUXILIARIES
let GetServiceAuxiliaries = new ActionBase({ name: 'GET_SERVICE_AUXILIARIES' });
GetServiceAuxiliaries.do = function (args) {
	Utils.checkMembers(args, ['serviceId', 'token']);
	var reqParam = {
		url   : getServiceUrl(args.serviceId) + '/auxiliaries',
		token : args.token
	};
	return RestService._request(reqParam);
}
