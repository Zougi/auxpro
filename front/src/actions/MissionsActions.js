import ActionBase from 'core/ActionBase.js';
import Utils from 'utils/Utils.js';
import RestService from 'services/rest/RestService.js';

/* **
 * HELPERS **
 * */

function getMissionUrl(missionId) {
	return '/missions/' + (missionId ? missionId  : '');
}

/* **
 * SERVICES **
 * */

// GET MISSION
let GetMission = new ActionBase({ name: 'GET_MISSION' });
GetMission.do = function (args) {
	Utils.checkMembers(args, ['missionId', 'token']);
	var reqParam = {
		url   : getMissionUrl(args.missionId),
		token : args.token
	};
	return RestService._request(reqParam);
}

// PUT MISSION
let PutMission = new ActionBase({ name: 'PUT_MISSION' });
PutMission.do = function (args) {
	Utils.checkMembers(args, ['missionId', 'data', 'token']);
	var reqParam = {
		url   : getMissionUrl(args.missionId),
		data  : args.data,
		method: 'PUT',
		token : args.token
	};
	return RestService._request(reqParam);
}

// DELETE MISSION
let DeleteMission = new ActionBase({ name: 'DELETE_MISSION' });
DeleteMission.do = function (args) {
	Utils.checkMembers(args, ['missionId', 'token']);
	var reqParam = {
		url   : getMissionUrl(args.missionId),
		method: 'DELETE',
		token : args.token
	};
	return RestService._request(reqParam);
}