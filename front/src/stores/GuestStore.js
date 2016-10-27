import Dispatcher from 'core/Dispatcher.js';
import StoreBase from 'core/StoreBase.js';
import StoreRegistry from 'core/StoreRegistry';

function getDefaultContent() {
	return { 
		data: getDefaultDataContent(),
		display: {
			postalCode: null
		}
	};
};

function getDefaultDataContent() {
	return {
		services: {},
		servicesList: [],
		servicesLoaded: false
	}
}

var GuestStore = new StoreBase ({ 
	name: 'GUEST_STORE',
	content: getDefaultContent()
});

/* ACTIONS CALLBACKS */
//------------------------------------------------------------

// LOGOUT
GuestStore.onLogout = function (result, param) {
	GuestStore.setContent(getDefaultContent());
	GuestStore.notify('/');
};
Dispatcher.register('LOGOUT', GuestStore.onLogout);

// GET SERVICES
GuestStore.onGetServices = function (result, param) {
	GuestStore._content.data = getDefaultDataContent();
	let l = result.length;
	for (let i = 0; i < l; i++) {
		let serv = result[i];
		GuestStore._content.data.servicesList.push({
			id: serv.id,
			name: serv.society
		});
		GuestStore._content.data.services[serv.id] = serv;
	}
	GuestStore._content.data.servicesLoaded = true;
	GuestStore.notify();
};
Dispatcher.register('GET_SERVICES', GuestStore.onGetServices);

// GUEST_FILTER_SERVICES
GuestStore.onFilterServices = function (result, param) {
	GuestStore._content.display.postalCode = param.postalCode;
	GuestStore.notifyPath('/display/postalCode');
};
Dispatcher.register('GUEST_FILTER_SERVICES', GuestStore.onFilterServices);

export default GuestStore;