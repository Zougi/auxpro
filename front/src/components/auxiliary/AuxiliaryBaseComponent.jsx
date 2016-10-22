import React from 'react';

import StoreRegistry from 'core/StoreRegistry';

class AuxiliaryBaseComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	_getStore(id) {
		return StoreRegistry.getStore(id);
	}
	_getLoginStore() {
		return this._getStore('LOGIN_STORE');
	}
	_getAuxiliaryStore() {
		return this._getStore('AUXILIARY_STORE');
	}

	getLoginData() {
		return this._getLoginStore().getData('/');
	}
	getOffer(id) {
		return this._getAuxiliaryStore().getData('/data/offers/' + id);
	}
	getCustomer(id) {
		return this._getAuxiliaryStore().getData('/data/customers/' + id);
	}
	getService(id) {
		return this._getAuxiliaryStore().getData('/data/services/' + id);
	}
	getIntervention(id) {
		return this._getAuxiliaryStore().getData('/data/interventions/' + id);
	}

	render() {
		return('');
	}
}

export default AuxiliaryBaseComponent;
