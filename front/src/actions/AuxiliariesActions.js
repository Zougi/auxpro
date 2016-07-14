import ActionBase from '../core/ActionBase.js';
import Utils from '../utils/Utils.js';
import RestService from '../services/rest/RestService.js';

// AUXILIARIES

let GetAuxiliaries = new ActionBase({ name: 'GET_AUXILIARIES' });
GetAuxiliaries.do = function (args) {
	Utils.checkMembers(args, ['token']);
	return RestService.getAuxiliaries(args);
}

// AUXILIARY

let GetAuxiliary = new ActionBase({ name: 'GET_AUXILIARY' });
GetAuxiliary.do = function (args) {
	Utils.checkMembers(args, ['token', 'id']);
	return RestService.getAuxiliary(args);
}

let PostAuxiliary = new ActionBase({ name: 'POST_AUXILIARY' });
PostAuxiliary.do = function (args) {
	Utils.checkMembers(args, ['name', 'password', 'email']);
	var params = {
		token: Utils.encode('guest', 'guest'),
		data: args
	};
	return RestService.postAuxiliary(params);	
}

let PutAuxiliary = new ActionBase({ name: 'PUT_AUXILIARY' });
PutAuxiliary.do = function (args) {
	Utils.checkMembers(args, ['id', 'data', 'token']);
	return RestService.putAuxiliary(args);	
}

// MISSIONS

let GetAuxiliaryMissions = new ActionBase({ name: 'GET_AUXILIARY_MISSIONS' });
GetAuxiliaryMissions.do = function (args) {
	Utils.checkMembers(args, ['token', 'id']);
	return RestService.getAuxiliaryMissions(args);
}

// ABSENCES

let GetAuxiliaryAbsences = new ActionBase({ name: 'GET_AUXILIARY_ABSENCES' });
GetAuxiliaryAbsences.do = function (args) {
	Utils.checkMembers(args, ['token', 'id']);
	return RestService.getAuxiliaryAbsences(args);
}

let PostAuxiliaryAbsence = new ActionBase({ name: 'POST_AUXILIARY_ABSENCE' });
PostAuxiliaryAbsence.do = function (args) {
	Utils.checkMembers(args, ['token', 'id', 'data']);
	return RestService.postAuxiliaryAbsence(args);
}

// GEOZONES

let GetAuxiliaryGeoZones = new ActionBase({ name: 'GET_AUXILIARY_GEOZONES' });
GetAuxiliaryGeoZones.do = function (args) {
	Utils.checkMembers(args, ['token', 'id']);
	return RestService.getAuxiliaryGeoZones(args);
}

let PostAuxiliaryGeoZone = new ActionBase({ name: 'POST_AUXILIARY_GEOZONE' });
PostAuxiliaryGeoZone.do = function (args) {
	Utils.checkMembers(args, ['token', 'id', 'data']);
	return RestService.postAuxiliaryGeoZone(args);
}