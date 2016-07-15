import ActionBase from '../core/ActionBase.js';
import StoreRegistry from '../core/StoreRegistry';
import Utils from '../utils/Utils.js';
import RestService from '../services/rest/RestService.js';

/* **
 * HELPERS **
 * */

function getInterventionUrl(interventionId) {
	return '/interventions/' + (interventionId ? interventionId  : '');
}

/* **
 * SERVICES **
 * */

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
