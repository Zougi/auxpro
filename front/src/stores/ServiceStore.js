// Core modules
import Dispatcher from 'core/Dispatcher.js';
import StoreBase from 'core/StoreBase.js';
import StoreRegistry from 'core/StoreRegistry';
// Lib modules
import Utils from '../utils/Utils.js';

var DEFAULT_CONTENT = { 
	data: {},
	display: {
		home: {
			showUserHeader: false
		}
	}
};

var ServiceStore = new StoreBase ({ 
	name: 'SERVICE_STORE',
	content: DEFAULT_CONTENT
});

/* ACCESS HELPERS */

ServiceStore.getService = function (id) {
	return ServiceStore._content.service[id];
};

/* ACTION LISTENERS */
//------------------------------------------------------------

// NAVIGATE
ServiceStore.navigate = function (result, param) {
	if (result === '/sad/infos/edit' || result === '/sad/tuto') {
		ServiceStore.getContent().display.home.showUserHeader = false;
	} else {
		ServiceStore.getContent().display.home.showUserHeader = true;
	}
	ServiceStore.notifyPath('/display/home/showUserHeader');
};
Dispatcher.register('NAVIGATE', ServiceStore.navigate);

// LOGOUT
ServiceStore.onLogout = function (result, param) {
	ServiceStore.setContent(DEFAULT_CONTENT);
};
Dispatcher.register('LOGOUT', ServiceStore.onLogout);

// GET/PUT SERVICE
ServiceStore.onGetService = function (result, param) {
	ServiceStore.getContent().data.service = result;
	ServiceStore.getContent().data.serviceLoaded = true;
	ServiceStore.notify();
};
Dispatcher.register('GET_SERVICE', ServiceStore.onGetService);
Dispatcher.register('PUT_SERVICE', ServiceStore.onGetService);

// GET SERVICE CUSTOMERS
ServiceStore.onGetServiceCustomers = function (result, param) {
	let data = ServiceStore.getContent().data;
	let previous = data.customers || {};
	data.customers = {};
	if (result && result.length) {
		var l = result.length;
		for (let i = 0; i < l; i++) {
			let customer = result[i];
			customer.interventions = [];
			data.customers[customer.id] = customer;
		}
	}
	data.customersLoaded = true;
	ServiceStore._setUpInterventions();
	ServiceStore.notify();
};
Dispatcher.register('GET_SERVICE_CUSTOMERS', ServiceStore.onGetServiceCustomers);

// GET SERVICE INTERVENTIONS
ServiceStore.onGetServiceInterventions = function (result, param) {
	let data = ServiceStore.getContent().data;
	data.interventions = {};

	Utils.map(data.customers, function (customer) {
		customer.interventions = [];
	});
	if (result && result.length) {
		var l = result.length;
		for (let i = 0; i < l; i++) {
			let intervention = result[i];
			intervention.offers = [];
			data.interventions[intervention.id] = intervention;
		}
	}
	data.interventionsLoaded = true;
	ServiceStore._setUpInterventions();
	ServiceStore._setUpOffers();
	ServiceStore._setUpAuxiliaries();
	ServiceStore.notify();
};
Dispatcher.register('GET_SERVICE_INTERVENTIONS', ServiceStore.onGetServiceInterventions);

// GET SERVICE OFFERS
ServiceStore.onGetServiceOffers = function (result, param) {
	let data = ServiceStore.getContent().data;
	data.offers = {};

	Utils.map(data.interventions, function (intervention) {
		intervention.offers = [];
	});
	if (result && result.length) {
		var l = result.length;
		for (let i = 0; i < l; i++) {
			let offer = result[i];
			data.offers[offer.id] = offer;
		}
	}
	data.offersLoaded = true;
	ServiceStore._setUpOffers();
	ServiceStore._setUpAuxiliaries();
	ServiceStore.notify();

};
Dispatcher.register('GET_SERVICE_OFFERS', ServiceStore.onGetServiceOffers);

// POST OFFER
ServiceStore.onPostOffer = function (result, param) {
	let data = ServiceStore.getContent().data;
	data.offersLoaded = false;
	data.interventionsLoaded = false;
	data.auxiliariesLoaded = false;
};
Dispatcher.register('POST_OFFER', ServiceStore.onPostOffer);


// GET SERVICE AUXILIARIES
ServiceStore.onGetServiceAuxiliaries = function (result, param) {
	let data = ServiceStore.getContent().data;
	data.auxiliaries = {};
	if (result && result.length) {
		var l = result.length;
		for (let i = 0; i < l; i++) {
			let auxiliary = result[i];
			// store auxiliary
			data.auxiliaries[auxiliary.id] = auxiliary;
		}
	}
	data.auxiliariesLoaded = true;
	ServiceStore._setUpAuxiliaries();
	ServiceStore.notify();
};
Dispatcher.register('GET_SERVICE_AUXILIARIES', ServiceStore.onGetServiceAuxiliaries);

// GET INTERVENTION MATCH
ServiceStore.onGetInterventionMatch = function (result, param) {
	let data = ServiceStore.getContent().data;
	if (result && result.length > 0) {
		// Store link in intervention
		let intervention = data.interventions[param.interventionId];
		if (intervention) {
			intervention.matches = result;
		}
	}
};
Dispatcher.register('GET_INTERVENTION_MATCH', ServiceStore.onGetInterventionMatch);


/* INTERNAL DATA MANAGEMENT */
//------------------------------------------------------------

//
ServiceStore._setUpInterventions = function () {
	let data = ServiceStore.getContent().data;
	if (data.interventionsLoaded && data.customersLoaded) {
		Utils.map(data.interventions).forEach(function (intervention) {
			data.customers[intervention.customerId].interventions.push(intervention.id);
		});
	}
}

//
ServiceStore._setUpOffers = function () {
	let data = ServiceStore.getContent().data;
	if (data.interventionsLoaded && data.offersLoaded) {
		Utils.map(data.offers).forEach(function (offer) {
			data.interventions[offer.interventionId].offers.push(offer.id);
		});
	}
}

//
ServiceStore._setUpAuxiliaries = function () {
	let data = ServiceStore.getContent().data;
	if (data.auxiliariesLoaded && data.offersLoaded && data.interventionsLoaded) {
		Utils.map(data.offers).forEach(function (offer) {
			data.auxiliaries[offer.auxiliaryId]._type = 'offer';
		});
		Utils.map(data.interventions).forEach(function (intervention) {
			if (intervention.auxiliaryId) {
				data.auxiliaries[intervention.auxiliaryId]._type = 'intervention';
			}
		})
	}
}

export default ServiceStore;