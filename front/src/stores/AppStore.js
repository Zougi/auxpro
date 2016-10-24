import StoreBase from 'core/StoreBase.js';

import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

var DEFAULT_APP_CONTENT = {
	header: {
		brand: { link: '/', name: 'AuxPro' },
		rightContent: [
			{ link: '/contact', name: 'Contact', query: {}, key: 1, isLink: true },
			{ link: '/login', name: 'Connexion', query: {}, key: 2, isLink: true }
		]
	},
	subHeader: {}
};

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
AppStore.onLogon = function (result, param) {
	switch (result.type) {
	case 'aux':		
		AppStore._content.app = {
			header: {
				brand: { link: '/', name: 'AuxPro' },
				rightContent: [
					{ key: 1, link: '/aux/home', query: {}, name: 'Accueil', glyph: 'home' },
					{ key: 2, link: '/aux/infos', query: {}, name: 'Notifications', glyph: 'envelope' },
					{ key: 3, link: 'logout', query: {}, name: 'Déconnexion', glyph: 'off' }
				]
			},
			subHeader: {
				disabled: true,
				leftContent: [
					{ key: 0, link: '/aux/home', query: {}, name: 'Accueil' },
					{ key: 1, name: 'Profil', dropdown: [
						{ key: 1.1, link: '/aux/infos', query: {}, name: 'Voir profil' },
						{ key: 1.2, link: '/aux/edit', query: {}, name: 'Editer profil' }
					]},
					{ key: 2, link: '/aux/planning', query: {}, name: 'Planning' },
					{ key: 3, link: '/aux/zone', query: {}, name: 'Zone' },
					{ key: 4, link: '/aux/offres', query: {}, name: 'Offres' }
				]
			}
		}
		break;
	case 'sad':
		AppStore._content.app = {
			header: {
				brand: { link: '/', name: 'AuxPro' },
				rightContent: [
					{ key: 1, link: '/sad/home', query: {}, name: 'Accueil', glyph: 'home' },
					{ key: 2, link: '/sad/infos', query: {}, name: 'Notifications', glyph: 'envelope' },
					{ key: 3, link: 'logout', query: {}, name: 'Déconnexion', glyph: 'off' }
				]
			},
			subHeader: {
				disabled: false,
				leftContent: [
					{ key: 0, link: '/sad/home', query: {}, name: 'Accueil' },
					{ key: 1, name: 'Informations', dropdown: [
						{ key: 1.1, link: '/sad/infos', query: {}, name: 'Voir profil' },
						{ key: 1.2, link: '/sad/edit', query: {}, name: 'Editer profil' }
					]},
					{ key: 2, link: '/sad/zone', query: {}, name: 'Ma zone' },
					{ key: 3, link: '/sad/customers', query: {}, name: 'Mes clients' },
					{ key: 4, link: '/sad/interventions', query: {}, name: 'Mes interventions' }
				]
			}
		}
		break;
	default:
		break;
	}
	AppStore.notifyPath("/headers");
};
Dispatcher.register('LOGON', AppStore.onLogon);

// GET_AUXILIARY - PUT_AUXILIARY
AppStore.onGetAuxiliary = function (result, param) {
	if (StoreRegistry.getStore('LOGIN_STORE').getData('/type') === 'aux') {
		AppStore._content.app.subHeader.disabled = !result.profileCompleted;
		AppStore.notify();
	}
}
Dispatcher.register('GET_AUXILIARY', AppStore.onGetAuxiliary);
Dispatcher.register('PUT_AUXILIARY', AppStore.onGetAuxiliary);

// LOGOUT
AppStore.onLogout = function (result, param) {
	AppStore._content.app = DEFAULT_APP_CONTENT;
	AppStore.notifyPath("headers");
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