// Import core modules
import ActionBase from '../core/ActionBase.js';
// Import utilities module
import Utils from '../utils/Utils.js';
// Import services modules
import RestService from '../services/rest/RestService.js';

let GetServices = new ActionBase({ name: 'GET_SERVICES' });
GetServices.do = function (args) {
	Utils.checkMembers(args, ['token']);
	return RestService.getServices(args);
}

let PostService = new ActionBase({ name: 'POST_SERVICE' });
PostService.do = function (args) {
	Utils.checkMembers(args, ['name', 'password', 'email']);
	var params = {
		token: Utils.encode('guest', 'guest'),
		data: args
	};
	return RestService.postService(params);
}