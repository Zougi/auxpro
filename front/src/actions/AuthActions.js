import Utils from '../utils/Utils.js';
import ActionBase from '../core/ActionBase.js';
import StoreRegistry from '../core/StoreRegistry.js';
import RestService from '../services/rest/RestService.js';

// LOGON
var Logon = new ActionBase({ name: 'LOGON' });
Logon.do = function (args) {
	Utils.checkMembers(args, ['user', 'pass']);
	var params = { token: Utils.encode(args.user, args.pass) };
	return RestService.getAuth(params);
}

// LOGOUT
var Logout = new ActionBase({ name: 'LOGOUT' });
Logout.do = function () {
	return new Promise(function (resolve, reject) {
		resolve();
	});
}