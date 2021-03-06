import StoreBase from 'core/StoreBase.js';

import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

var DEFAULT_APP_CONTENT = {};

var DEFAULT_CONTENT = { 
	app: DEFAULT_APP_CONTENT,
	route: '/',
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

// LOGON
// AppStore.onLogon = function (result, param) {
	// switch (result.type) {
	// case 'aux':		
		// AppStore._content.app = {
			// subHeader: {
				// disabled: true,
				// leftContent: [
					// { key: 0, link: '/aux/home', query: {}, name: 'Accueil' },
					// { key: 1, name: 'Informations', dropdown: [
						// { key: 1.1, link: '/aux/infos', query: {}, name: 'Voir mes informations' },
						// { key: 1.2, link: '/aux/infos/edit', query: {}, name: 'Modifier mes informations' }
					// ]},
					// { key: 2, link: '/aux/planning', query: {}, name: 'Planning' },
					// { key: 3, link: '/aux/zone', query: {}, name: 'Zone' },
					// { key: 4, link: '/aux/offers', query: {}, name: 'Offres' }
				// ]
			// }
		// }
		// break;
	// case 'sad':
		// AppStore._content.app = {
			// subHeader: {
				// disabled: true,
				// leftContent: [
					// { key: 0, link: '/sad/home', query: {}, name: 'Accueil' },
					// { key: 1, name: 'Informations', dropdown: [
						// { key: 1.1, link: '/sad/infos', query: {}, name: 'Voir mes informations' },
						// { key: 1.2, link: '/sad/infos/edit', query: {}, name: 'Modifier mes informations' }
					// ]},
					// { key: 2, link: '/sad/zone', query: {}, name: 'Ma zone' },
					// { key: 3, link: '/sad/customers', query: {}, name: 'Mes usagers' },
					// { key: 4, link: '/sad/interventions', query: {}, name: 'Mes prestations' }
				// ]
			// }
		// }
		// break;
	// default:
		// break;
	// }
	// AppStore.notifyPath('/app');
// };
// Dispatcher.register('LOGON', AppStore.onLogon);

// GET_AUXILIARY - PUT_AUXILIARY
// AppStore.onGetAuxiliary = function (result, param) {
	// if (StoreRegistry.getStore('LOGIN_STORE').getData('/type') === 'aux') {
		// AppStore._content.app.subHeader.disabled = !result.profileCompleted;
		// AppStore.notifyPath('/app/subHeader/disabled');
	// }
// }
// Dispatcher.register('GET_AUXILIARY', AppStore.onGetAuxiliary);

// GET_SERVICE - PUT_SERVICE
// AppStore.onGetService = function (result, param) {
	// if (StoreRegistry.getStore('LOGIN_STORE').getData('/type') === 'sad') {
		// AppStore._content.app.subHeader.disabled = !result.profileCompleted;
		// AppStore.notifyPath('/app/subHeader/disabled');
	// }
// }
// Dispatcher.register('GET_SERVICE', AppStore.onGetService);

// LOGOUT
AppStore.onLogout = function (result, param) {
	AppStore._content.app = DEFAULT_APP_CONTENT;
	AppStore.notifyPath('/app');
};
Dispatcher.register('LOGOUT', AppStore.onLogout);

// NAVIGATE
AppStore.navigate = function (result, param) {
	AppStore._content.path = result;
	AppStore.notifyPath('/path');
};
Dispatcher.register('NAVIGATE', AppStore.navigate);

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