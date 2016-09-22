import StoreBase from 'core/StoreBase.js';

import Dispatcher from 'core/Dispatcher';

var DEFAULT_CONTENT = { 
	busy: false,
	images: {}
};

var AppStore = new StoreBase ({ 
	name: 'APP_STORE',
	content: DEFAULT_CONTENT
});

AppStore.setBusy = function (busy) {
	AppStore.busy = busy;
	AppStore.notify();
}

// GET IMAGE
AppStore.onGetImage = function (result, param) {
	AppStore._content.images[param.image] = result;
	AppStore.notify();
};
Dispatcher.register('GET_IMAGE', AppStore.onGetImage);


export default AppStore;