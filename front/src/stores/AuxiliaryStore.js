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
	if (args && args.length > 0) {
		AuxiliaryStore._content.auxiliary[args[0].auxiliaryId].missions = args;
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

export default AuxiliaryStore;