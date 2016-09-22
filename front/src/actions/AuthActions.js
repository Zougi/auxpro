import Utils from 'utils/Utils.js';
import ActionBase from 'core/ActionBase.js';
import RestService from 'services/rest/RestService.js';

// LOGON
var Logon = new ActionBase({ name: 'LOGON' });
Logon.do = function (args) {
	Utils.checkMembers(args, ['user', 'pass']);
	var reqParam = {
		url   : '/auth',
		token : Utils.encode(args.user, args.pass)
	}; 
	return RestService._request(reqParam);
}

// LOGOUT
var Logout = new ActionBase({ name: 'LOGOUT' });
Logout.do = function () {
	return new Promise(function (resolve, reject) {
		resolve();
	});
}

// GET IMAGE
let GetImage = new ActionBase({ name: 'GET_IMAGE' });
GetImage.do = function (args) {
	Utils.checkMembers(args, ['token', 'image']);
	var reqParam = {
		url   : '/images/' + args.image,
		token : args.token,
		type  : 'arraybuffer'
	}; 
	return RestService._request(reqParam);
}