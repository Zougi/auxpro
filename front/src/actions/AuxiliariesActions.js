import ActionBase from 'core/ActionBase.js';
import Utils from 'utils/Utils.js';
import RestService from 'services/rest/RestService.js';

/* **
 * HELPERS **
 * */

function getAuxiliaryUrl(auxiliaryId) {
	return '/auxiliaries/' + (auxiliaryId ? auxiliaryId  : '');
}

/* **
 * SERVICES **
 * */

// GET AUXILIARIES
let GetAuxiliaries = new ActionBase({ name: 'GET_AUXILIARIES' });
GetAuxiliaries.do = function (args) {
	Utils.checkMembers(args, ['token']);
	var reqParam = {
		url   : getAuxiliaryUrl(),
		token : args.token
	}; 
	return RestService._request(reqParam);
}

// GET AUXILIARY
let GetAuxiliary = new ActionBase({ name: 'GET_AUXILIARY' });
GetAuxiliary.do = function (args) {
	Utils.checkMembers(args, ['auxiliaryId', 'token']);
	var reqParam = {
		url   : getAuxiliaryUrl(args.auxiliaryId),
		token : args.token
	};
	return RestService._request(reqParam);
}

// POST AUXILIARY
let PostAuxiliary = new ActionBase({ name: 'POST_AUXILIARY' });
PostAuxiliary.do = function (args) {
	Utils.checkMembers(args, ['name', 'password', 'email']);
	var reqParam = {
		url   : getAuxiliaryUrl(),
		method: 'POST',
		data: args,
		token : Utils.encode('guest', 'guest')
	};
	return RestService._request(reqParam);
}

// PUT AUXILIARY
let PutAuxiliary = new ActionBase({ name: 'PUT_AUXILIARY' });
PutAuxiliary.do = function (args) {
	Utils.checkMembers(args, ['auxiliaryId', 'data', 'token']);
	var reqParam = {
		url   : getAuxiliaryUrl(args.auxiliaryId),
		method: 'PUT',
		data  : args.data,
		token : args.token
	};
	return RestService._request(reqParam);
}

// POST AUXILIARY QUESTIONARY
let PostAuxiliaryQuestionary = new ActionBase({ name: 'POST_AUXILIARY_QUESTIONARY' });
PostAuxiliaryQuestionary.do = function (args) {
	Utils.checkMembers(args, ['auxiliaryId', 'token', 'data']);
	var reqParam = {
		url   : getAuxiliaryUrl(args.auxiliaryId) + '/questionary',
		method: 'POST',
		data  : args.data,
		token : args.token
	};
	return RestService._request(reqParam);
}

// GET AUXILIARY SERVICES
let GetAuxiliaryServices = new ActionBase({ name: 'GET_AUXILIARY_SERVICES' });
GetAuxiliaryServices.do = function (args) {
	Utils.checkMembers(args, ['auxiliaryId', 'token']);
	var reqParam = {
		url   : getAuxiliaryUrl(args.auxiliaryId) + '/services',
		token : args.token
	};
	return RestService._request(reqParam);
}

// GET AUXILIARY CUSTOMERS
let GetAuxiliaryCustomers = new ActionBase({ name: 'GET_AUXILIARY_CUSTOMERS' });
GetAuxiliaryCustomers.do = function (args) {
	Utils.checkMembers(args, ['auxiliaryId', 'token']);
	var reqParam = {
		url   : getAuxiliaryUrl(args.auxiliaryId) + '/customers',
		token : args.token
	};
	return RestService._request(reqParam);
}

// GET AUXILIARY INDISPONIBILITIES
let GetAuxiliaryIndisponibilities = new ActionBase({ name: 'GET_AUXILIARY_INDISPONIBILITIES' });
GetAuxiliaryIndisponibilities.do = function (args) {
	Utils.checkMembers(args, ['auxiliaryId', 'token']);
	var reqParam = {
		url   : getAuxiliaryUrl(args.auxiliaryId) + '/indisponibilities',
		token : args.token
	};
	return RestService._request(reqParam);
}

// GET AUXILIARY INTERVENTIONS
let GetAuxiliaryInterventions = new ActionBase({ name: 'GET_AUXILIARY_INTERVENTIONS' });
GetAuxiliaryInterventions.do = function (args) {
	Utils.checkMembers(args, ['auxiliaryId', 'token']);
	var reqParam = {
		url   : getAuxiliaryUrl(args.auxiliaryId) + '/interventions',
		token : args.token
	};
	return RestService._request(reqParam);
}

// GET AUXILIARY OFFERS
let GetAuxiliaryOffers = new ActionBase({ name: 'GET_AUXILIARY_OFFERS' });
GetAuxiliaryOffers.do = function (args) {
	Utils.checkMembers(args, ['auxiliaryId', 'token']);
	var reqParam = {
		url   : getAuxiliaryUrl(args.auxiliaryId) + '/offers',
		token : args.token
	};
	return RestService._request(reqParam);
}

// GET AUXILIARY OFFERS
let GetAuxiliaryMissions = new ActionBase({ name: 'GET_AUXILIARY_MISSIONS' });
GetAuxiliaryMissions.do = function (args) {
	Utils.checkMembers(args, ['auxiliaryId', 'token']);
	var reqParam = {
		url   : getAuxiliaryUrl(args.auxiliaryId) + '/missions',
		token : args.token
	};
	return RestService._request(reqParam);
}

// GET GEOZONES
let GetAuxiliaryGeoZones = new ActionBase({ name: 'GET_AUXILIARY_GEOZONES' });
GetAuxiliaryGeoZones.do = function (args) {
	Utils.checkMembers(args, ['auxiliaryId', 'token']);
	var reqParam = {
		url   : '/auxiliaries/' + args.auxiliaryId + '/geozones',
		token : args.token,
	};
	return RestService._request(reqParam);
}
