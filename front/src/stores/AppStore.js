import StoreBase from 'core/StoreBase.js';

import Dispatcher from 'core/Dispatcher';

var DEFAULT_APP_CONTENT = {
	header: {
		brand: { link: '/', name: 'AuxPro' },
		rightContent: [
			{ link: '/contact', name: 'Contact', query: {}, key: 1, isLink: true },
			{ link: '/login', name: 'Connexion', query: {}, key: 2, isLink: true }
		]
	},
	subHeader: []
};

var DEFAULT_CONTENT = { 
	app: DEFAULT_APP_CONTENT,
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
AppStore.onLogon = function (result, param) {
	function logout () { Dispatcher.issue('LOGOUT', {}); }
	switch (result.type) {
	case 'aux':		
		AppStore._content.app = {
			header: {
				brand: { link: '/', name: 'AuxPro' },
				rightContent: [
					{ key: 1, link: '/home', name: 'Acceuil', query: {} },
					{ key: 2, link: '/home/infos', name: 'Mon Compte', query: {} },
					{ key: 3, callback: logout, name: 'Déconnexion' }
				]
			},
			subHeader: [
				{ key: 0, link: '/home', name: 'Acceuil', query: {} },
				{ key: 1, link: '/home/infos', name: 'Mon profil', query: {} },
				{ key: 2, link: '/home/planning', name: 'Mon planning', query: {} },
				{ key: 3, link: '/home/zone', name: 'Ma zone', query: {} },
				{ key: 4, link: '/home/offres', name: 'Mes offres', query: {} }
			]
		}
		break;
	case 'sad':
		AppStore._content.app = {
			header: {
				brand: { link: '/', name: 'AuxPro' },
				rightContent: [
					{ key: 1, link: '/home', name: 'Acceuil', query: {} },
					{ key: 2, link: '/home/infos', name: 'Mon Compte', query: {} },
					{ key: 3, callback: logout, name: 'Déconnexion'}
				]
			},
			subHeader: [
				{ key: 0, link: '/home', name: 'Acceuil', query: {} },
				{ key: 1, link: '/home/infos', name: 'Informations', query: {} },
				{ key: 2, link: '/home/zone', name: 'Ma zone', query: {} },
				{ key: 3, link: '/home/customers', name: 'Mes clients', query: {} },
				{ key: 4, link: '/home/interventions', name: 'Mes interventions', query: {} }
			]
		}
		break;
	default:
		break;
	}
	AppStore.notify();
};
Dispatcher.register('LOGON', AppStore.onLogon);

// LOGOUT
AppStore.onLogout = function (result, param) {
	AppStore._content.app = DEFAULT_APP_CONTENT;
	AppStore.notify();
};
Dispatcher.register('LOGOUT', AppStore.onLogout);

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