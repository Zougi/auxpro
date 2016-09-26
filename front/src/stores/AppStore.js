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
					{ key: 1, link: '/home', query: {}, name: 'Accueil', glyph: 'home' },
					{ key: 2, link: '/home/infos', query: {}, name: 'Notifications', glyph: 'envelope' },
					{ key: 3, callback: logout, name: 'Déconnexion', glyph: 'off' }
				]
			},
			subHeader: [
				{ key: 0, link: '/home', query: {}, name: 'Accueil' },
				{ key: 1, title: 'Profil', dropdown: [
					{ key: 1.1, link: '/home/infos', query: {}, name: 'Voir profil' },
					{ key: 1.2, link: '/home/infos', query: { edit: true }, name: 'Editer profil' }
				]},
				{ key: 2, link: '/home/planning', query: {}, name: 'Mon planning' },
				{ key: 3, link: '/home/zone', query: {}, name: 'Ma zone' },
				{ key: 4, link: '/home/offres', query: {}, name: 'Mes offres' }
			]
		}
		break;
	case 'sad':
		AppStore._content.app = {
			header: {
				brand: { link: '/', name: 'AuxPro' },
				rightContent: [
					{ key: 1, link: '/home', query: {}, name: 'Accueil', glyph: 'home' },
					{ key: 2, link: '/home/infos', query: {}, name: 'Notifications', glyph: 'envelope' },
					{ key: 3, callback: logout, name: 'Déconnexion', glyph: 'off' }
				]
			},
			subHeader: [
				{ key: 0, link: '/home', query: {}, name: 'Accueil' },
				{ key: 1, title: 'Informations', dropdown: [
					{ key: 1.1, link: '/home/infos', query: {}, name: 'Voir profil' },
					{ key: 1.2, link: '/home/infos', query: { edit: true }, name: 'Editer profil' }
				]},
				{ key: 2, link: '/home/zone', query: {}, name: 'Ma zone' },
				{ key: 3, link: '/home/customers', query: {}, name: 'Mes clients' },
				{ key: 4, link: '/home/interventions', query: {}, name: 'Mes interventions' }
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