import Dispatcher from '../core/Dispatcher.js';
import StoreBase from '../core/StoreBase.js';

var DEFAULT_CONTENT = { auxiliaries: [],  auxiliary: {}};

var AuxiliaryStore = new StoreBase ({ 
	name: 'AUXILIARY_STORE',
	content: DEFAULT_CONTENT
});

AuxiliaryStore.onGetAuxiliaries = function (args) {
	AuxiliaryStore._content.auxiliaries = args;
	AuxiliaryStore.notify();
};

Dispatcher.register('GET_AUXILIARIES', AuxiliaryStore.onGetAuxiliaries);

AuxiliaryStore.onGetAuxiliary = function (args) {
	AuxiliaryStore._content.auxiliary[args.id] = args;
	AuxiliaryStore.notify();
};

Dispatcher.register('GET_AUXILIARY', AuxiliaryStore.onGetAuxiliary);
Dispatcher.register('PUT_AUXILIARY', AuxiliaryStore.onGetAuxiliary);

AuxiliaryStore.onGetAuxiliaryMissions = function (args) {
	let auxId = args.missions[0].auxiliaryId;
	if (args && args.missions && args.missions.length > 0) {
		AuxiliaryStore._content.auxiliary[auxId].missions = args.missions;
		AuxiliaryStore._content.auxiliary[auxId].services = [];
		if (args && args.services) {
			for (let sId in args.services) {
				if (args.services.hasOwnProperty(sId)) {
					AuxiliaryStore._content.auxiliary[auxId].services.push(sId);
				}
			}
		}
		AuxiliaryStore._content.auxiliary[auxId].customers = [];
		if (args && args.customers) {
			for (let cId in args.customers) {
				if (args.services.hasOwnProperty(cId)) {
					AuxiliaryStore._content.auxiliary[auxId].customers.push(cId);
				}
			}
		}
		AuxiliaryStore.notify();
	}	
};

Dispatcher.register('GET_AUXILIARY_MISSIONS', AuxiliaryStore.onGetAuxiliaryMissions);

AuxiliaryStore.onGetAuxiliaryAbsences = function (args) {
	if (args && args.length > 0) {
		AuxiliaryStore._content.auxiliary[args[0].auxiliaryId].absences = args;
		AuxiliaryStore.notify();
	}	
};

Dispatcher.register('GET_AUXILIARY_ABSENCES', AuxiliaryStore.onGetAuxiliaryAbsences);


AuxiliaryStore.onGetAuxiliaryGeoZones = function (args) {
	if (args && args.length > 0) {
		AuxiliaryStore._content.auxiliary[args[0].auxiliaryId].geoZones = args;
		AuxiliaryStore.notifyPath('/auxiliary/geoZones');
	}	
};

Dispatcher.register('GET_AUXILIARY_GEOZONES', AuxiliaryStore.onGetAuxiliaryGeoZones);

export default AuxiliaryStore;