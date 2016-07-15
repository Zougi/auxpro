import ActionBase from '../core/ActionBase.js';
import StoreRegistry from '../core/StoreRegistry';
import Utils from '../utils/Utils.js';
import RestService from '../services/rest/RestService.js';

/* **
 * SERVICES **
 * */

function getServiceUrl(serviceId) {
	return '/services/' + (serviceId ? serviceId  : '');
}
function getCustomerUrl(serviceId, customerId) {
	return '/services/' + serviceId + '/customers/' + (customerId ? customerId : '');
}
function getInterventionUrl(serviceId, customerId, interventionId) {
	if (customerId) {
		return '/services/' + serviceId + '/customers/' + customerId  + '/interventions/' + (interventionId ? interventionId : '');
	} else {
		return '/services/' + serviceId + '/interventions/' + (interventionId ? interventionId : '');
	}
}
function getOfferUrl(offerId) {
	return '/offers/' + (offerId ? offerId  : '');
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
	let service = StoreRegistry.getStore('SERVICE_STORE').getData('/service/' + args.serviceId);
	if (service && !args.refresh) {
		return new Promise(function(resolve) {
			resolve(service);
		});
	} else {
		var reqParam = {
			url   : getServiceUrl(args.serviceId),
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
		url   : getServiceUrl(),
		method: 'POST',
		data: args,
		token : args.token
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

/* **
 * CUSTOMERS **
 * */

// GET SERVICE CUSTOMERS
let GetServiceCustomers = new ActionBase({ name: 'GET_SERVICE_CUSTOMERS' });
GetServiceCustomers.do = function (args) {
	Utils.checkMembers(args, ['serviceId', 'token']);
	var reqParam = {
		url   : getCustomerUrl(args.serviceId),
		token : args.token
	};
	return RestService._request(reqParam);
}

// POST SERVICE CUSTOMER
let PostServiceCustomer = new ActionBase({ name: 'POST_SERVICE_CUSTOMER' });
PostServiceCustomer.do = function (args) {
	Utils.checkMembers(args, ['serviceId', 'data', 'token']);
	var reqParam = {
		url   : getCustomerUrl(args.serviceId),
		method: 'POST',
		data  : args.data,
		token : args.token
	};
	return RestService._request(reqParam);
}

// PUT SERVICE CUSTOMER
let PutServiceCustomer = new ActionBase({ name: 'PUT_SERVICE_CUSTOMER' });
PutServiceCustomer.do = function (args) {
	Utils.checkMembers(args, ['serviceId', 'customerId', 'data', 'token']);
	var reqParam = {
		url   : getCustomerUrl(args.serviceId, args.customerId),
		method: 'PUT',
		data  : args.data,
		token : args.token
	};
	return RestService._request(reqParam);
}

// DELETE SERVICE CUSTOMER
let DeleteServiceCustomer = new ActionBase({ name: 'DELETE_SERVICE_CUSTOMER' });
DeleteServiceCustomer.do = function (args) {
	Utils.checkMembers(args, ['serviceId', 'customerId', 'token']);
	var reqParam = {
		url   : getCustomerUrl(args.serviceId, args.customerId),
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
	Utils.checkMembers(args, ['serviceId', 'token']);
	var reqParam = {
		url   : getInterventionUrl(args.serviceId),
		token : args.token
	};
	return RestService._request(reqParam);
}

// GET SERVICE CUSTOMER INTERVENTIONS
let GetServiceCustomerInterventions = new ActionBase({ name: 'GET_SERVICE_CUSTOMER_INTERVENTIONS' });
GetServiceCustomerInterventions.do = function (args) {
	Utils.checkMembers(args, ['serviceId', 'customerId', 'token']);
	var reqParam = {
		url   : getInterventionUrl(args.serviceId, args.customerId),
		token : args.token
	};
	return RestService._request(reqParam);
}

// POST SERVICE CUSTOMER INTERVENTION
let PostServiceCustomerInterventions = new ActionBase({ name: 'POST_SERVICE_CUSTOMER_INTERVENTION' });
PostServiceCustomerInterventions.do = function (args) {
	Utils.checkMembers(args, ['serviceId', 'customerId', 'data', 'token']);
	var reqParam = {
		url   : getInterventionUrl(args.serviceId, args.customerId),
		data  : args.data,
		method: 'POST',
		token : args.token
	};
	return RestService._request(reqParam);
}

// PUT SERVICE CUSTOMER INTERVENTION
let PutServiceCustomerInterventions = new ActionBase({ name: 'PUT_SERVICE_CUSTOMER_INTERVENTION' });
PutServiceCustomerInterventions.do = function (args) {
	Utils.checkMembers(args, ['serviceId', 'customerId', 'interventionId', 'data', 'token']);
	var reqParam = {
		url   : getInterventionUrl(args.serviceId, args.customerId, args.interventionId),
		data  : args.data,
		method: 'PUT',
		token : args.token
	};
	return RestService._request(reqParam);
}

// DELETE SERVICE CUSTOMER INTERVENTION
let DeleteServiceCustomerInterventions = new ActionBase({ name: 'DELETE_SERVICE_CUSTOMER_INTERVENTION' });
DeleteServiceCustomerInterventions.do = function (args) {
	Utils.checkMembers(args, ['serviceId', 'customerId', 'interventionId', 'token']);
	var reqParam = {
		url   : getInterventionUrl(args.serviceId, args.customerId, args.interventionId),
		method: 'DELETE',
		token : args.token
	};
	return RestService._request(reqParam);
}


/* **
 * OFFERS **
 * */

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

// POST OFFER
let PostOffer = new ActionBase({ name: 'POST_OFFER' });
PostOffer.do = function (args) {
	Utils.checkMembers(args, ['data', 'token']);
	var reqParam = {
		url   : getOfferUrl(),
		data  : args.data,
		method: 'POST',
		token : args.token
	};
	return RestService._request(reqParam);
}

// PUT OFFER
let PutOffer = new ActionBase({ name: 'PUT_OFFER' });
PutOffer.do = function (args) {
	Utils.checkMembers(args, ['offerId', 'data', 'token']);
	var reqParam = {
		url   : getOfferUrl(args.offerId),
		data  : args.data,
		method: 'PUT',
		token : args.token
	};
	return RestService._request(reqParam);
}

// DELETE OFFER
let DeleteOffer = new ActionBase({ name: 'DELETE_OFFER' });
DeleteOffer.do = function (args) {
	Utils.checkMembers(args, ['offerId', 'token']);
	var reqParam = {
		url   : getOfferUrl(args.offerId),
		method: 'DELETE',
		token : args.token
	};
	return RestService._request(reqParam);
}