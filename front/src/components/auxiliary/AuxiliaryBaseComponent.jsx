import React from 'react';
// Core modules
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

class AuxiliaryBaseComponent extends React.Component {

	constructor(props) {
		super(props);
		this.loginStore = StoreRegistry.getStore('LOGIN_STORE');
		this.auxiliaryStore = StoreRegistry.getStore('AUXILIARY_STORE');
	}

	_getLoginData(path) {
		return this.loginStore.getData(path);
	}
	_getAuxiliaryData(path) {
		return this.auxiliaryStore.getData(path);
	}

	// Login //

	getLoginData() {
		return this._getLoginData('/');
	}
	
	// Customers //

	getCustomer(id) {
		return this._getAuxiliaryData('/data/customers/' + id);
	}

	// Services //

	getService(id) {
		return this._getAuxiliaryData('/data/services/' + id);
	}

	// Interventions //

	getIntervention(id) {
		return this._getAuxiliaryData('/data/interventions/' + id);
	}

	// Offers //

	getOffer(id) {
		return this._getAuxiliaryData('/data/offers/' + id);
	}
	updateOffer(offer) { return 
		Dispatcher.issue('PUT_OFFER', {
			data: offer,
			offerId: offer.id,
			token: this.getLoginData().token
		}).
		then(function () {
			return Dispatcher.issue('GET_AUXILIARY_OFFERS', { 
				token: this.getLoginData().token,
				auxiliaryId: this.getLoginData().id
			})
		});
	}

	render() {
		return('');
	}
}

export default AuxiliaryBaseComponent;
