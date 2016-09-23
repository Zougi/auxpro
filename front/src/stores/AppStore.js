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
	var source = 'data:' + result.type + ';base64,' + btoa(String.fromCharCode.apply(null, new Uint8Array(result.content)));
	let img = new Image();
	img.onload = function () {
		AppStore._content.images[param.image] = img;
		AppStore.notify();
	}
	img.src = source;
	
};
Dispatcher.register('GET_IMAGE', AppStore.onGetImage);


export default AppStore;