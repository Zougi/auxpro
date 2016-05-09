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
	AuxiliaryStore._content.auxiliary[args.name] = args;
	AuxiliaryStore.notify();
};

Dispatcher.register('GET_AUXILIARY', AuxiliaryStore.onGetAuxiliary);

Dispatcher.register('PUT_AUXILIARY', AuxiliaryStore.onGetAuxiliary);

export default AuxiliaryStore;