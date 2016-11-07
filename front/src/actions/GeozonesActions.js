import ActionBase from 'core/ActionBase.js';
import Utils from 'utils/Utils.js';
import RestService from 'services/rest/RestService.js';

/* **
 * HELPERS **
 * */

function getGeozoneUrl(geozoneId) {
	return '/geozones/' + (geozoneId ? geozoneId : '');
}

/* **
 * SERVICES **
 * */

// POST GEOZONE
let PostGeozone = new ActionBase({ name: 'POST_GEOZONE' });
PostGeozone.do = function (args) {
	Utils.checkMembers(args, ['data', 'token']);
	var reqParam = {
		url   : getGeozoneUrl(),
		method: 'POST',
		data  : args.data,
		token : args.token
	};
	return RestService._request(reqParam);
}

// GET GEOZONE
let GetGeozone = new ActionBase({ name: 'GET_GEOZONE' });
GetGeozone.do = function (args) {
	Utils.checkMembers(args, ['geozoneId', 'token']);
	var reqParam = {
		url   : getGeozoneUrl(args.geozoneId),
		token : args.token
	};
	return RestService._request(reqParam);
}

// PUT GEOZONE
let PutGeozone = new ActionBase({ name: 'PUT_GEOZONE' });
PutGeozone.do = function (args) {
	Utils.checkMembers(args, ['geozoneId', 'data', 'token']);
	var reqParam = {
		url   : getGeozoneUrl(args.geozoneId),
		method: 'PUT',
		data  : args.data,
		token : args.token
	};
	return RestService._request(reqParam);
}

// DELETE GEOZONE
let DeleteGeozone = new ActionBase({ name: 'DELETE_GEOZONE' });
DeleteGeozone.do = function (args) {
	Utils.checkMembers(args, ['geozoneId', 'token']);
	var reqParam = {
		url   : getGeozoneUrl(args.geozoneId),
		method: 'DELETE',
		token : args.token
	};
	return RestService._request(reqParam);
}
