import Utils from '../utils/Utils.js';
// Import core modules
import Dispatcher from '../core/Dispatcher.js';
import StoreBase from '../core/StoreBase.js';

var DEFAULT_CONTENT = { logged: false };

var LoginStore = new StoreBase ({ 
	name: 'LOGIN_STORE',
	content: DEFAULT_CONTENT
});

LoginStore.setToken = function (token) {
	LoginStore._content = Utils.merge(LoginStore._content, { token: token }, true);
}

// LOGON
LoginStore.onLogon = function (result, param) {
	result.logged = true;
	result.token = Utils.encode(param.user, param.pass);
	LoginStore._content = result;
	LoginStore.notify();
};
Dispatcher.register('LOGON', LoginStore.onLogon);

// LOGOUT
LoginStore.onLogout = function (result, param) {
	LoginStore._content = DEFAULT_CONTENT;
	LoginStore.notify();
};
Dispatcher.register('LOGOUT', LoginStore.onLogout);

export default LoginStore;