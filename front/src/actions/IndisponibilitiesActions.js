import ActionBase from 'core/ActionBase.js';
import Utils from 'utils/Utils.js';
import RestService from 'services/rest/RestService.js';

/* **
 * HELPERS **
 * */

function getIndisponibilityUrl(id) {
	return '/indisponibilities/' + (id ? id  : '');
}

/* **
 * SERVICES **
 * */

// POST INDISPONIBILITY
let PostIndisponibility = new ActionBase({ name: 'POST_INDISPONIBILITY' });
PostIndisponibility.do = function (args) {
	Utils.checkMembers(args, ['data', 'token']);
	var reqParam = {
		url   : getIndisponibilityUrl(),
		data  : args.data,
		method: 'POST',
		token : args.token
	};
	return RestService._request(reqParam);
}

// GET INDISPONIBILITY
let GetIndisponibility = new ActionBase({ name: 'GET_INDISPONIBILITY' });
GetIndisponibility.do = function (args) {
	Utils.checkMembers(args, ['indisponibilityId', 'token']);
	var reqParam = {
		url   : getIndisponibilityUrl(args.indisponibilityId),
		token : args.token
	};
	return RestService._request(reqParam);
}

// PUT INDISPONIBILITY
let PutIndisponibility = new ActionBase({ name: 'PUT_INDISPONIBILITY' });
PutIndisponibility.do = function (args) {
	Utils.checkMembers(args, ['indisponibilityId', 'data', 'token']);
	var reqParam = {
		url   : getIndisponibilityUrl(args.indisponibilityId),
		data  : args.data,
		method: 'PUT',
		token : args.token
	};
	return RestService._request(reqParam);
}

// DELETE INDISPONIBILITY
let DeleteIndisponibility = new ActionBase({ name: 'DELETE_INDISPONIBILITY' });
DeleteIndisponibility.do = function (args) {
	Utils.checkMembers(args, ['indisponibilityId', 'token']);
	var reqParam = {
		url   : getIndisponibilityUrl(args.indisponibilityId),
		method: 'DELETE',
		token : args.token
	};
	return RestService._request(reqParam);
}