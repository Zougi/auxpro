import ActionBase from 'core/ActionBase.js';
import Utils from 'utils/Utils.js';
import RestService from 'services/rest/RestService.js';

/* **
 * HELPERS **
 * */

function getInterventionUrl(interventionId) {
	return '/interventions/' + (interventionId ? interventionId  : '');
}

/* **
 * SERVICES **
 * */

// POST INTERVENTION
let PostIntervention = new ActionBase({ name: 'POST_INTERVENTION' });
PostIntervention.do = function (args) {
	Utils.checkMembers(args, ['data', 'token']);
	var reqParam = {
		url   : getInterventionUrl(),
		data  : args.data,
		method: 'POST',
		token : args.token
	};
	return RestService._request(reqParam);
}

// GET INTERVENTION
let GetIntervention = new ActionBase({ name: 'GET_INTERVENTION' });
GetIntervention.do = function (args) {
	Utils.checkMembers(args, ['interventionId', 'token']);
	var reqParam = {
		url   : getInterventionUrl(args.interventionId),
		token : args.token
	}; 
	return RestService._request(reqParam);
}

// PUT INTERVENTION
let PutIntervention = new ActionBase({ name: 'PUT_INTERVENTION' });
PutIntervention.do = function (args) {
	Utils.checkMembers(args, ['interventionId', 'data', 'token']);
	var reqParam = {
		url   : getInterventionUrl(args.interventionId),
		data  : args.data,
		method: 'PUT',
		token : args.token
	};
	return RestService._request(reqParam);
}

// DELETE INTERVENTION
let DeleteIntervention = new ActionBase({ name: 'DELETE_INTERVENTION' });
DeleteIntervention.do = function (args) {
	Utils.checkMembers(args, ['interventionId', 'token']);
	var reqParam = {
		url   : getInterventionUrl(args.interventionId),
		method: 'DELETE',
		token : args.token
	};
	return RestService._request(reqParam);
}

// GET INTERVENTION MATCH
let GetInterventionMatch = new ActionBase({ name: 'GET_INTERVENTION_MATCH' });
GetInterventionMatch.do = function (args) {
	Utils.checkMembers(args, ['interventionId', 'token']);
	var reqParam = {
		url   : getInterventionUrl(args.interventionId) + '/match',
		token : args.token
	}; 
	return RestService._request(reqParam);
}
