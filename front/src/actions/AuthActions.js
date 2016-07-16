import Utils from '../utils/Utils.js';
import ActionBase from '../core/ActionBase.js';
import StoreRegistry from '../core/StoreRegistry.js';
import RestService from '../services/rest/RestService.js';

var Logon = new ActionBase({ name: 'LOGON' });
Logon.do = function (args) {
	Utils.checkMembers(args, ['user', 'pass']);
	var token = Utils.encode(args.user, args.pass);
	StoreRegistry.getStore('LOGIN_STORE').setToken(token);
	var params = { token: token };
	return RestService.getAuth(params);
}

var Logout = new ActionBase({ name: 'LOGOUT' });
Logout.do = function () {
	StoreRegistry.getStore('LOGIN_STORE').reset();
	return new Promise(function (resolve, reject) {
		resolve();
	});
}