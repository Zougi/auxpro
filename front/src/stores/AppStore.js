import StoreBase from 'core/StoreBase.js';

var DEFAULT_CONTENT = { busy: false };

var AppStore = new StoreBase ({ 
	name: 'APP_STORE',
	content: DEFAULT_CONTENT
});

AppStore.setBusy = function (busy) {
	AppStore.busy = busy;
	AppStore.notify();
}

export default AppStore;