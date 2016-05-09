import Dispatcher from '../core/Dispatcher.js';
import StoreBase from '../core/StoreBase.js';

var DEFAULT_CONTENT = { logged: false };

var ErrorStore = new StoreBase ({ 
	name: 'ERROR_STORE',
	content: DEFAULT_CONTENT
});

ErrorStore.onCheckCredentialsSuccess = function () {
	delete ErrorStore._content.logon;
	ErrorStore.notify();
};
ErrorStore.onCheckCredentialsError = function (args) {
	ErrorStore._content.logon = args;
	ErrorStore.notify();
};

Dispatcher.register('LOGON', ErrorStore.onCheckCredentialsSuccess, ErrorStore.onCheckCredentialsError);

export default ErrorStore;