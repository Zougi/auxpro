// Core modules
import Dispatcher from 'core/Dispatcher'
import StoreBase from 'core/StoreBase'
import StoreRegistry from 'core/StoreRegistry'
// Lib modules
import MomentHelper from 'utils/moment/MomentHelper'
import Period from 'utils/constants/Period'
import { DAYS } from 'utils/moment/Days'
import Utils from 'utils/Utils'

var DEFAULT_CONTENT = {
	data: {},
	display: {
		home: {
			showUserHeader: true
		}
	}
};

var AuxiliaryStore = new StoreBase ({ 
	name: 'AUXILIARY_STORE',
	content: DEFAULT_CONTENT
});

AuxiliaryStore.getAuxiliary = function (auxiliaryId) {
	let auxiliary = AuxiliaryStore._content.auxiliary[auxiliaryId] || {};
	AuxiliaryStore._content.auxiliary[auxiliaryId] = auxiliary;
	return auxiliary;
};


/* ACTIONS CALLBACKS */
//------------------------------------------------------------

// NAVIGATE
AuxiliaryStore.navigate = function (result, param) {
	if (result === '/aux/infos/edit' || result === '/aux/tuto' || result === '/aux/infos/questionary/edit') {
		AuxiliaryStore.getContent().display.home.showUserHeader = false;
	} else {
		AuxiliaryStore.getContent().display.home.showUserHeader = true;
	}
	AuxiliaryStore.notifyPath('/display/home/showUserHeader');
};
Dispatcher.register('NAVIGATE', AuxiliaryStore.navigate);

// LOGOUT
AuxiliaryStore.onLogout = function (result, param) {
	AuxiliaryStore.setContent(DEFAULT_CONTENT);
	AuxiliaryStore.notify('/');
};
Dispatcher.register('LOGOUT', AuxiliaryStore.onLogout);

// GET AUXILIARY
// PUT AUXILIARY
AuxiliaryStore.onGetAuxiliary = function (result, param) {
	AuxiliaryStore.getContent().data.auxiliary = result || {};
	AuxiliaryStore.getContent().data.auxiliaryLoaded = true;
	AuxiliaryStore.notifyPath('/data/auxiliary');
};
Dispatcher.register('GET_AUXILIARY', AuxiliaryStore.onGetAuxiliary);
Dispatcher.register('PUT_AUXILIARY', AuxiliaryStore.onGetAuxiliary);

// GET ALL SERVICES
AuxiliaryStore.onGetAllServices = function (result, param) {
	let data = AuxiliaryStore.getContent().data;
	data.services = {};
	if (result && result.length) {
		let l = result.length;
		for (let i = 0; i < l; i++) {
			let service = result[i];
			data.services[service.id] = service;
		}
	}
	data.servicesLoaded = true;
	AuxiliaryStore.notifyPath('/data/services');
}
Dispatcher.register('GET_SERVICES', AuxiliaryStore.onGetAllServices);

// GET AUXILIARY SERVICES
AuxiliaryStore.onGetAuxiliaryServices = function (result, param) {
	let data = AuxiliaryStore.getContent().data;
	data.services = {};
	if (result && result.length) {
		let l = result.length;
		for (let i = 0; i < l; i++) {
			let service = result[i];
			data.services[service.id] = service;
		}
	}
	data.servicesLoaded = true;
	AuxiliaryStore.notifyPath('/data/services');
}
Dispatcher.register('GET_AUXILIARY_SERVICES', AuxiliaryStore.onGetAuxiliaryServices);

// GET AUXILIARY CUSTOMERS
AuxiliaryStore.onGetAuxiliaryCustomers = function (result, param) {
	let data = AuxiliaryStore.getContent().data;
	data.customers = {};
	if (result && result.length) {
		let l = result.length;
		for (let i = 0; i < l; i++) {
			let customer = result[i];
			data.customers[customer.id] = customer;
		}
	}
	data.customersLoaded = true;
	AuxiliaryStore._setUpOffers();
	AuxiliaryStore._setUpInterventions();
	AuxiliaryStore.notify();
}
Dispatcher.register('GET_AUXILIARY_CUSTOMERS', AuxiliaryStore.onGetAuxiliaryCustomers);

// GET AUXILIARY OFFERS
AuxiliaryStore.onGetAuxiliaryOffers = function (result, param) {
	let data = AuxiliaryStore.getContent().data;
	data.offers = {};
	if (result && result.length) {
		let l = result.length;
		for (let i = 0; i < l; i++) {
			let offer = result[i];
			data.offers[offer.id] = offer;
		}
	}
	data.offersLoaded = true;
	AuxiliaryStore._setUpOffers();
	AuxiliaryStore.notify();
}
Dispatcher.register('GET_AUXILIARY_OFFERS', AuxiliaryStore.onGetAuxiliaryOffers);

// GET AUXILIARY MISSIONS
AuxiliaryStore.onGetAuxiliaryMissions = function (result, param) {
	let data = AuxiliaryStore.getContent().data;
	data.missions = {};
	if (result && result.length) {
		let l = result.length;
		for (let i = 0; i < l; i++) {
			let mission = result[i];
			data.missions[mission.id] = mission;
		}
	}
	data.missionsLoaded = true;
	AuxiliaryStore.notify();
}
Dispatcher.register('GET_AUXILIARY_MISSIONS', AuxiliaryStore.onGetAuxiliaryMissions);


// GET AUXILIARY INTERVENTIONS
AuxiliaryStore.onGetAuxiliaryInterventions = function (result, param) {
	let data = AuxiliaryStore.getContent().data;
	data.interventions = {};
	if (result && result.length) {
		let l = result.length;
		for (let i = 0; i < l; i++) {
			let intervention = result[i];
			data.interventions[intervention.id] = intervention;
		}
	}
	data.interventionsLoaded = true;
	AuxiliaryStore._setUpInterventions();
	AuxiliaryStore.notify();
}
Dispatcher.register('GET_AUXILIARY_INTERVENTIONS', AuxiliaryStore.onGetAuxiliaryInterventions);

// GET AUXILIARY INDISPONIBILITIES
AuxiliaryStore.onGetAuxiliaryIndisponibilities = function (result, param) {
	let data = AuxiliaryStore.getContent().data;
	data.indisponibilities = {};
	data.indisponibilities.absences = [];
	if (result && result.length) {
		let l = result.length;
		for (let i = 0; i < l; i++) {
			let indisponibility = result[i];
			data.indisponibilities[indisponibility.id] = indisponibility;
			let period = Period.getPeriod(indisponibility.period);
			switch (period) {
			case Period.ONE:
				data.indisponibilities.absences.push({
					indisponibilityId: indisponibility.id,
					date: indisponibility.startDate,
					startTime: indisponibility.startTime,
					endTime: indisponibility.endTime
				});
				break;
			case Period.P1W:
			case Period.P2W:
			case Period.P3W:
			case Period.P4W:
				let startDate = MomentHelper.fromLocalDate(indisponibility.startDate);
				let endDate = MomentHelper.fromLocalDate(indisponibility.endDate);
				let current = startDate.clone().startOf('week');
				while (current.isSameOrBefore(endDate)) {
					for (let d = 0; d < indisponibility.days.length; d++) {
						let day = DAYS[indisponibility.days[d]];
						let date = current.clone().add(day.pos, 'day');
						if (date.isSameOrAfter(startDate) && date.isSameOrBefore(endDate)) {
							data.indisponibilities.absences.push({
								indisponibilityId: indisponibility.id,
								date: MomentHelper.toLocalDate(date),
								startTime: indisponibility.startTime,
								endTime: indisponibility.endTime
							});
						}
					}
					current.add(period.days, 'day');
				}
				break;
			}
		}
	}
	data.indisponibilitiesLoaded = true;
	AuxiliaryStore.notify();
}
Dispatcher.register('GET_AUXILIARY_INDISPONIBILITIES', AuxiliaryStore.onGetAuxiliaryIndisponibilities);

// GET AUXILIARY GEOZONES
AuxiliaryStore.onGetAuxiliaryGeoZones = function (result, param) {
	let data = AuxiliaryStore.getContent().data;
	data.geozones = {};
	if (result && result.length) {
		let l = result.length;
		for (let i = 0; i < l; i++) {
			let geozone = result[i];
			data.geozones[geozone.id] = geozone;
		}
	}
	data.geozonesLoaded = true;
	AuxiliaryStore.notifyPath('/data/geozones');
};
Dispatcher.register('GET_AUXILIARY_GEOZONES', AuxiliaryStore.onGetAuxiliaryGeoZones);


/* INTERNAL DATA MANAGEMENT */
//------------------------------------------------------------

//
AuxiliaryStore._setUpInterventions = function () {
	let data = AuxiliaryStore.getContent().data;
	if (data.interventionsLoaded && data.customersLoaded) {
		Utils.map(data.interventions).forEach(function (intervention) {
			if (intervention.auxiliaryId) {
				data.customers[intervention.customerId]._type = 'intervention';
			}
		});
	}
}

//
AuxiliaryStore._setUpOffers = function () {
	let data = AuxiliaryStore.getContent().data;
	if (data.offersLoaded && data.customersLoaded) {
		Utils.map(data.offers).forEach(function (offer) {
			let c = data.customers[offer.customerId];
			c._type = c._type || 'offer';
		});
	}
}

export default AuxiliaryStore;